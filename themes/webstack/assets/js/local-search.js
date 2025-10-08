/* 本地搜索功能
*/
// 等待 DOM 完全加载后再初始化
document.addEventListener('DOMContentLoaded', function() {
    initLocalSearch();
});

function initLocalSearch() {
    var input = document.getElementById("search-input");
    var resultsList = document.getElementById('search-results');
    
    if (!input || !resultsList) {
        console.error('搜索元素未找到');
        return;
    }
    
    var items = resultsList.getElementsByTagName("li");
    
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
    
    // 封装搜索逻辑
    function search() {
        var keyword = this.value;  
        var placeholder = document.getElementById('search-placeholder');
        
        if (keyword.trim() === '') {
            resultsList.innerHTML = '';
            if (placeholder) {
                placeholder.textContent = '搜索本页内容';
                placeholder.style.display = 'block';
            }
            return;  
        }
        if (encodeURIComponent(keyword.trim()).length === 1) {
            resultsList.innerHTML = '';
            if (placeholder) {
                placeholder.innerHTML = '<strong>提示：</strong>至少输入2个字母、数字或1个汉字';
                placeholder.style.display = 'block';
            }
            return;  
        }
        
        // 隐藏占位符
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        
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
            var placeholder = document.getElementById('search-placeholder');
            if (placeholder) {
                placeholder.textContent = '没有找到匹配的内容。';
                placeholder.style.display = 'block';
            }
        }
    }
    
    // 添加输入事件监听，使用防抖函数
    input.addEventListener("input", debounce(search, 300));
    
    /*搜索按钮：打开搜索框*/
    function openSearchBox() {
        var searchBox = document.getElementById('overlay');  
        if (!searchBox.classList.contains('show')) {  
            searchBox.classList.add('show');
            var inputElement = document.getElementById('search-input');  
            if (inputElement) {
                setTimeout(function() {
                    inputElement.focus();
                }, 400);
            }
        } else {  
            searchBox.classList.remove('show');
        }  
    }
    
    // 绑定桌面端搜索按钮
    var desktopSearchBtn = document.getElementById('search-btn');
    if (desktopSearchBtn) {
        desktopSearchBtn.addEventListener('click', openSearchBox);
    }
    
    // 绑定移动端搜索按钮（侧边栏中的）
    var mobileSearchBtnSidebar = document.getElementById('search-btn-mobile-sidebar');
    if (mobileSearchBtnSidebar) {
        mobileSearchBtnSidebar.addEventListener('click', openSearchBox);
    }
    
    /*Ctrl+F：打开搜索框*/
    document.addEventListener('keydown', function(event) { 
        var searchBox = document.getElementById('overlay');
        var inputElement = document.getElementById('search-input');  
        if (event.ctrlKey && event.key === 'f') {
            if (!searchBox.classList.contains('show')) {               
                searchBox.classList.add('show');
                if (inputElement) {
                    setTimeout(function() {
                        inputElement.focus();
                    }, 400);
                }
                event.preventDefault();
            } else {
                searchBox.classList.remove('show');
                event.preventDefault();
            }
        }  
    });
    
    /*点击空白处：关闭搜索框*/
    var overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function(event) {  
            var searchBox = document.getElementById('search-box');   
            if (searchBox && !searchBox.contains(event.target)) {
                this.classList.remove('show');
            }  
        });
    }
    
    /*搜索框关闭按钮*/
    var closeButton = document.getElementById('close-button');
    if (closeButton) {
        closeButton.addEventListener('click', function(event) {
            var searchBox = document.getElementById('overlay'); 
            if (searchBox) {
                searchBox.classList.remove('show');
            }
        });
    }
    
    /*键盘事件：结果列表选择*/
    var index = -1;
    document.addEventListener("keydown", function (event) {
        // 只在搜索框打开时处理键盘事件
        var searchBox = document.getElementById('overlay');
        if (!searchBox || !searchBox.classList.contains('show')) {
            return;
        }
        
        var items = resultsList.getElementsByTagName("li");
        if (items.length === 0) {
            return;
        }
        
        // 如果按下上箭头
        if (event.key === 'ArrowUp') {
            if (index == -1 || index == 0) {
                index = items.length - 1;
            } else {
                index--;
            }
            
            for (var i = 0; i < items.length; i++) {
                if (i == index) {
                    items[i].classList.add("highlight");
                    items[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } else {
                    items[i].classList.remove("highlight");
                }
            }
            event.preventDefault();
        }
        
        // 如果按下下箭头
        if (event.key === 'ArrowDown') {
            if (index == -1 || index == items.length - 1) {
                index = 0;
            } else {
                index++;
            }
            
            for (var i = 0; i < items.length; i++) {
                if (i == index) {
                    items[i].classList.add("highlight");
                    items[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } else {
                    items[i].classList.remove("highlight");
                }
            }
            event.preventDefault();
        }
        
        // 如果按下回车键
        if (event.key === 'Enter') {
            if (index != -1 && index < items.length) {
                var link = items[index].getElementsByTagName("a")[0];
                if (link) {
                    link.click();
                }
            }
            event.preventDefault();
        }
    });
}
