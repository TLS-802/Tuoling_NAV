/* 本地搜索功能 - 移植自TLS-Toolbox
 * 支持搜索当前页面的所有网站卡片
 * 支持拼音搜索（如果启用）
 */

var searchInput = document.getElementById("search-input");
var searchResultsList = document.getElementById('search-results');
var searchItems = null;

// 定义一个防抖函数，避免频繁触发输入事件
function debounceSearch(fn, delay) {
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

// 根据pinyin-pro匹配的下标，获取匹配到的字
function getMatchedWord(text, index) {
    if (index == Number(index)) {
        return text[index];
    }   
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
function performSearch() {
    if (!searchInput || !searchResultsList) return;
    
    var keyword = this.value;  
    if (keyword.trim() === '') {
        searchResultsList.innerHTML = '<span>搜索本页内容</span>';
        return;  
    }
    
    if (encodeURIComponent(keyword.trim()).length === 1) {
        searchResultsList.innerHTML = '<span><strong>提示：</strong>至少输入2个字母、数字或1个汉字</span>';
        return;  
    }    
    
    // 获取所有网站卡片
    var allCards = document.querySelectorAll('.url-card');
    var results = [];
    let regex = new RegExp(keyword, 'i'); // 'i' 标志表示不区分大小写     
    
    // 检查是否有拼音支持
    var pyMatch = null;
    if (typeof pinyinPro !== 'undefined') {
        pyMatch = pinyinPro.match;
    } 
    
    for (var i = 0; i < allCards.length; i++) {  
        var cardLink = allCards[i].querySelector('a.card');
        if (!cardLink) continue;
        
        // 获取卡片中的标题
        var titleElement = cardLink.querySelector('.overflowClip_1 strong');
        if (!titleElement) continue;
        
        var title = titleElement.textContent.trim();
        var href = cardLink.getAttribute('href');
        
        // 获取图标
        var imgElement = cardLink.querySelector('.url-img img');
        var imgSrc = imgElement ? imgElement.getAttribute('src') : '';
        
        // 常规匹配
        let wordMatch = title.match(regex);
        
        // 拼音匹配
        var pinyinMatchResult = null;
        if (pyMatch && /^[a-zA-Z0-9]/.test(keyword)) { 
            pinyinMatchResult = pyMatch(title, keyword, { continuous: true, precision: 'start'});
        }
        
        if (wordMatch || pinyinMatchResult) {
            results.push({
                href: href,
                text: title,
                imgSrc: imgSrc,
                pyMatch: pinyinMatchResult,
                wdMatch: wordMatch
            });  
        }
    }  
    
    // 渲染搜索结果
    searchResultsList.innerHTML = '';
    if (results.length > 0) {
        var defaultLogo = (typeof theme !== 'undefined' && theme.logo) ? theme.logo : '/images/logo.png';
        
        for (var j = 0; j < results.length; j++) {
            // 高亮匹配的文字
            var word = '';
            if (results[j].wdMatch) {
                word = results[j].wdMatch[0];
            } else if (results[j].pyMatch) {
                word = getMatchedWord(results[j].text, results[j].pyMatch);
            }
            
            var highlight = word ? "<strong>" + word + "</strong>" : '';
            var newtext = word ? results[j].text.replace(word, highlight) : results[j].text;
            
            // 创建结果列表项
            var listItem = document.createElement('li');  
            
            // 添加图标
            var newIcon = document.createElement('i');
            var img = document.createElement('img');
            img.src = results[j].imgSrc || defaultLogo;
            img.onerror = function() { 
                this.src = defaultLogo; 
            };
            newIcon.appendChild(img);
            
            // 添加链接
            var newLink = document.createElement('a');  
            newLink.href = results[j].href;  
            newLink.innerHTML = newtext;                      
            newLink.target = "_blank";
            
            // 组装列表项
            listItem.appendChild(newIcon);
            listItem.appendChild(newLink);  
            searchResultsList.appendChild(listItem);  
        }
    } else {  
        searchResultsList.innerHTML = '<span>没有找到匹配的内容。</span>';        
    }
    
    // 更新搜索项引用
    searchItems = searchResultsList.getElementsByTagName("li");
}

// 搜索按钮：打开搜索框
function openLocalSearchBox() {
    var searchBox = document.getElementById('local-search-overlay');  
    if (!searchBox) return;
    
    if (searchBox.style.display === 'none' || !searchBox.style.display) {  
        searchBox.style.display = 'block';
        var inputElement = document.getElementById('search-input');
        if (inputElement) {
            inputElement.focus(); 
        }
    } else {  
        searchBox.style.display = 'none';
    }  
}

// 初始化搜索功能
function initLocalSearch() {
    // 绑定输入事件
    if (searchInput) {
        searchInput.addEventListener("input", debounceSearch(performSearch, 300));
    }
    
    // 绑定右下角搜索按钮
    var footerSearchBtn = document.querySelector('a[rel="search"]');
    if (footerSearchBtn) {
        // 移除原有的 data-toggle 和 data-target
        footerSearchBtn.removeAttribute('data-toggle');
        footerSearchBtn.removeAttribute('data-target');
        // 添加新的点击事件
        footerSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLocalSearchBox();
        });
    }
    
    // Ctrl+F：打开搜索框
    document.addEventListener('keydown', function(event) { 
        var searchBox = document.getElementById('local-search-overlay');
        if (!searchBox) return;
        
        var inputElement = document.getElementById('search-input');  
        if (event.ctrlKey && event.key === 'f') {
            if (searchBox.style.display === 'none' || !searchBox.style.display) {               
                searchBox.style.display = 'block';
                if (inputElement) inputElement.focus();
                event.preventDefault();
            } else {
                searchBox.style.display = 'none';
                event.preventDefault();
            }
        }  
    });
    
    // 点击空白处：关闭搜索框
    var searchOverlay = document.getElementById('local-search-overlay');
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(event) {  
            var searchBox = document.getElementById('local-search-box');   
            if (searchBox && !searchBox.contains(event.target)) {
                this.style.display = 'none';
            }  
        });
    }
    
    // 搜索框关闭按钮
    var closeButton = document.getElementById('local-search-close');
    if (closeButton) {
        closeButton.addEventListener('click', function(event) {
            var searchBox = document.getElementById('local-search-overlay'); 
            if (searchBox) {
                searchBox.style.display = 'none';
            }
        });
    }
    
    // 键盘事件：结果列表选择
    var index = -1;
    document.addEventListener("keydown", function (event) {
        if (!searchItems || searchItems.length === 0) return;
        
        // 上箭头
        if (event.key === 'ArrowUp') {
            if (index == -1 || index == 0) {
                index = searchItems.length - 1;
            } else {
                index--;
            }
            for (var i = 0; i < searchItems.length; i++) {
                if (i == index) {
                    searchItems[i].classList.add("highlight");
                    searchItems[i].scrollIntoView({ block: 'nearest' });
                } else {
                    searchItems[i].classList.remove("highlight");
                }
            }
            event.preventDefault();
        }
        
        // 下箭头
        if (event.key === 'ArrowDown') {
            if (index == -1 || index == searchItems.length - 1) {
                index = 0;
            } else {
                index++;
            }
            for (var i = 0; i < searchItems.length; i++) {
                if (i == index) {
                    searchItems[i].classList.add("highlight");
                    searchItems[i].scrollIntoView({ block: 'nearest' });
                } else {
                    searchItems[i].classList.remove("highlight");
                }
            }
            event.preventDefault();
        }
        
        // 回车键
        if (event.key === 'Enter') {
            if (index != -1 && searchItems[index]) {
                var link = searchItems[index].getElementsByTagName("a")[0];
                if (link) link.click();
            }
        }
        
        // ESC键关闭搜索框
        if (event.key === 'Escape') {
            var searchBox = document.getElementById('local-search-overlay');
            if (searchBox) {
                searchBox.style.display = 'none';
            }
        }
    });
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocalSearch);
} else {
    initLocalSearch();
}
