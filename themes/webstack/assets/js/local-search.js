/* 本地搜索功能 - 重构版
*/
document.addEventListener('DOMContentLoaded', function() {
    initLocalSearch();
});

function initLocalSearch() {
    var input = document.getElementById("search-input");
    var resultsList = document.getElementById('search-results');
    var placeholder = document.getElementById('search-placeholder');
    var overlay = document.getElementById('overlay');
    
    if (!input || !resultsList) {
        console.error('搜索元素未找到');
        return;
    }
    
    var searchIndex = -1; // 当前选中的搜索结果索引
    
    // 定义一个防抖函数，避免频繁触发输入事件
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var context = this;
            var args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }
    
    //根据pinyin-pro匹配的下标，获取匹配到的字
    function getMatchedWord(text, index) {
        // 如果下标是一个数字，就返回对应位置的字符
        if (index == Number(index)) {
            return text[index];
        }   
        // 如果下标是一个数组，就返回对应范围的字符串
        if (Array.isArray(index)) {
            var result = "";
            for (var i = 0; i < index.length; i++) {
                result += text.charAt(index[i]);
            }
            return result;
        }  
        return '';
    }
    
    // 搜索逻辑
    function search() {
        var keyword = this.value.trim();
        searchIndex = -1; // 重置选中索引
        
        if (keyword === '') {
            resultsList.innerHTML = '';
            showPlaceholder('搜索本页内容');
            return;
        }
        
        if (encodeURIComponent(keyword).length === 1) {
            resultsList.innerHTML = '';
            showPlaceholder('<strong>提示：</strong>至少输入2个字母、数字或1个汉字');
            return;
        }
        
        hidePlaceholder();
        
        var xCards = document.getElementsByClassName('url-card');  
        var results = [];
        let regex = new RegExp(keyword, 'i');
        
        var pyMatch;
        if (typeof pinyinPro !== 'undefined') {
            pyMatch = pinyinPro.match;
        } 
        
        for (var i = 0; i < xCards.length; i++) {  
            var cardLink = xCards[i].querySelector('a.card');  
            if (!cardLink) continue;
            
            // 获取a标签中的文本内容
            var titleEl = cardLink.querySelector('.text-sm.overflowClip_1 strong');
            var descEl = cardLink.querySelector('p.overflowClip_1.m-0.text-muted.text-xs');
            if (!titleEl || !descEl) continue;
            
            var clipContent = titleEl.textContent.trim() + " - " + descEl.textContent.trim();
            var imgEl = cardLink.querySelector('img.lazy');
            var imgSrc = imgEl ? imgEl.getAttribute('data-src') : ''; 
            
            if (cardLink) {
                // 常规匹配
                let wordMatch = clipContent.match(regex);
                // 拼音匹配
                var pinyinMatch;
                if (pyMatch !== undefined && /^[a-zA-Z0-9]/.test(keyword)) { 
                   pinyinMatch = pyMatch(clipContent, keyword, { continuous: true, precision: 'start'});
                }
                if (wordMatch || pinyinMatch) {
                    results.push({
                        href: cardLink.href,
                        text: clipContent,
                        dataSrc: imgSrc,
                        pyMatch: pinyinMatch,
                        wdMatch: wordMatch
                    });  
                }  
            }  
        }  
        
        resultsList.innerHTML = '';
        if (results.length > 0) {
            var defaultLogo = (typeof rootPath !== 'undefined' ? rootPath : './') + 'images/驼铃标志1.png';
            for (var j = 0; j < results.length; j++) {
                // 用高亮的标签替换匹配到的汉字
                var word;
                if (results[j].wdMatch){
                    word = results[j].wdMatch[0];
                } else {
                    word = getMatchedWord(results[j].text, results[j].pyMatch);
                }
                var highlight = "<strong>" + word + "</strong>";
                var newtext = results[j].text.replace(word, highlight);
                
                // 结果列表
                var listItem = document.createElement('li');  
                var newIcon = document.createElement('i');
                var img = document.createElement('img');
                img.classList.add('lazy');
                img.src = defaultLogo;
                img.setAttribute('data-src', results[j].dataSrc);
                img.setAttribute('onerror', `javascript:this.src='${defaultLogo}'`);
                newIcon.appendChild(img);
                
                var newLink = document.createElement('a');  
                newLink.href = results[j].href;  
                newLink.innerHTML = newtext;                      
                newLink.target = "_blank";
                
                listItem.appendChild(newIcon);
                listItem.appendChild(newLink);  
                resultsList.appendChild(listItem);  
            }
            
            // 触发图片懒加载
            if (typeof $ !== 'undefined' && typeof $.fn.lazyload !== 'undefined') {
                $("img.lazy").lazyload();
            }
        } else {
            resultsList.innerHTML = '';
            showPlaceholder('没有找到匹配的内容');
        }
    }
    
    // 显示占位符
    function showPlaceholder(text) {
        if (placeholder) {
            var iconHtml = '<i class="fas fa-search placeholder-icon"></i>';
            placeholder.innerHTML = iconHtml + '<p>' + text + '</p>';
            placeholder.classList.remove('hidden');
        }
    }
    
    // 隐藏占位符
    function hidePlaceholder() {
        if (placeholder) {
            placeholder.classList.add('hidden');
        }
    }
    
    // 添加输入事件监听，使用防抖函数
    input.addEventListener("input", debounce(search, 300));
    
    /*打开/关闭搜索框*/
    function toggleSearchBox() {
        if (!overlay.classList.contains('show')) {
            overlay.classList.add('show');
            setTimeout(function() {
                input.focus();
            }, 300);
        } else {
            closeSearchBox();
        }
    }
    
    function closeSearchBox() {
        overlay.classList.remove('show');
        input.value = '';
        resultsList.innerHTML = '';
        searchIndex = -1;
        showPlaceholder('搜索本页内容');
    }
    
    // 绑定搜索按钮
    var desktopSearchBtn = document.getElementById('search-btn');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', toggleSearchBox);
    }
    
    var mobileSearchBtn = document.getElementById('search-btn-mobile-sidebar');
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', toggleSearchBox);
    }
    
    // 绑定关闭按钮
    var closeBtn = document.getElementById('close-button');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSearchBox);
    }
    
    // 快捷键支持
    document.addEventListener('keydown', function(event) {
        // Ctrl+F 或 Cmd+F 打开搜索
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            toggleSearchBox();
            return;
        }
        
        // ESC 关闭搜索
        if (event.key === 'Escape' && overlay.classList.contains('show')) {
            event.preventDefault();
            closeSearchBox();
            return;
        }
        
        // 上下键导航（只在搜索框打开且有结果时）
        if (!overlay.classList.contains('show')) return;
        
        var items = resultsList.getElementsByTagName('li');
        if (items.length === 0) return;
        
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            searchIndex = searchIndex <= 0 ? items.length - 1 : searchIndex - 1;
            updateSelection(items);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            searchIndex = searchIndex >= items.length - 1 ? 0 : searchIndex + 1;
            updateSelection(items);
        } else if (event.key === 'Enter' && searchIndex >= 0 && searchIndex < items.length) {
            event.preventDefault();
            var link = items[searchIndex].querySelector('a');
            if (link) link.click();
        }
    });
    
    // 更新选中状态
    function updateSelection(items) {
        for (var i = 0; i < items.length; i++) {
            if (i === searchIndex) {
                items[i].classList.add('highlight');
                items[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                items[i].classList.remove('highlight');
            }
        }
    }
    
    // 点击空白处关闭
    overlay.addEventListener('click', function(event) {
        var searchBox = document.getElementById('search-box');
        if (searchBox && !searchBox.contains(event.target)) {
            closeSearchBox();
        }
    });
    
}
