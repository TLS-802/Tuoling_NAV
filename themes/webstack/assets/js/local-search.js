/**
 * 本地搜索功能 - 重构版
 * 搜索当前页面的所有网站卡片
 * 支持拼音搜索（如果启用）
 */

(function() {
    'use strict';
    
    // 配置项
    const CONFIG = {
        debounceDelay: 300,
        minSearchLength: 1,
        defaultLogo: '/images/logo.png',
        selectors: {
            overlay: '#local-search-overlay',
            searchBox: '#local-search-box',
            searchInput: '#search-input',
            searchResults: '#search-results',
            closeBtn: '#local-search-close',
            searchBtn: 'a[rel="search"]',
            cards: '.url-card'
        }
    };
    
    // DOM 元素
    let elements = {};
    
    // 搜索状态
    let currentIndex = -1;
    let searchItems = [];
    let debounceTimer = null;
    
    /**
     * 初始化 DOM 元素引用
     */
    function initElements() {
        Object.keys(CONFIG.selectors).forEach(key => {
            elements[key] = document.querySelector(CONFIG.selectors[key]);
            if (!elements[key] && key !== 'searchBtn') {
                console.warn(`[本地搜索] 未找到元素: ${CONFIG.selectors[key]}`);
            }
        });
    }
    
    /**
     * 防抖函数
     */
    function debounce(func, delay) {
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        };
    }
    
    /**
     * 根据拼音匹配索引获取匹配的字符
     */
    function getMatchedWord(text, index) {
        if (typeof index === 'number') {
            return text[index] || '';
        }
        if (Array.isArray(index)) {
            return index.map(i => text.charAt(i)).join('');
        }
        return '';
    }
    
    /**
     * 创建搜索结果项
     */
    function createResultItem(result) {
        const li = document.createElement('li');
        li.className = 'result-item';
        
        // 创建图标
        const icon = document.createElement('div');
        icon.className = 'result-icon';
        const img = document.createElement('img');
        img.src = result.imgSrc || CONFIG.defaultLogo;
        img.alt = result.title || '';
        img.onerror = function() { this.src = CONFIG.defaultLogo; };
        icon.appendChild(img);
        
        // 创建链接
        const link = document.createElement('a');
        link.href = result.href;
        link.className = 'result-link';
        link.innerHTML = result.highlightedText;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        li.appendChild(icon);
        li.appendChild(link);
        
        return li;
    }
    
    /**
     * 渲染空状态
     */
    function renderEmptyState(message, icon = 'fa-search') {
        elements.searchResults.innerHTML = `
            <li class="search-tip">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </li>
        `;
    }
    
    /**
     * 执行搜索
     */
    function performSearch() {
        if (!elements.searchInput || !elements.searchResults) return;
        
        const keyword = elements.searchInput.value.trim();
        
        // 空值检查
        if (keyword === '') {
            renderEmptyState('开始搜索本页内容', 'fa-lightbulb');
            return;
        }
        
        // 最小长度检查
        if (encodeURIComponent(keyword).length === 1) {
            renderEmptyState('至少输入2个字母、数字或1个汉字', 'fa-info-circle');
            return;
        }
        
        // 获取所有卡片并搜索
        const allCards = document.querySelectorAll(CONFIG.selectors.cards);
        const results = [];
        const regex = new RegExp(keyword, 'i');
        
        // 检查拼音支持
        const pyMatch = typeof pinyinPro !== 'undefined' ? pinyinPro.match : null;
        
        // 遍历所有卡片
        allCards.forEach(card => {
            const cardLink = card.querySelector('a.card');
            if (!cardLink) return;
            
            // 获取标题
            const titleElement = cardLink.querySelector('.overflowClip_1 strong');
            if (!titleElement) return;
            const title = titleElement.textContent.trim();
            
            // 获取描述
            const descElement = cardLink.querySelector('.overflowClip_1 + p.overflowClip_1');
            const description = descElement ? descElement.textContent.trim() : '';
            
            // 组合搜索文本
            const searchText = title + (description ? ' - ' + description : '');
            const href = cardLink.getAttribute('href');
            
            // 获取图标
            const imgElement = cardLink.querySelector('.url-img img');
            const imgSrc = imgElement ? (imgElement.getAttribute('data-src') || imgElement.getAttribute('src') || '') : '';
            
            // 常规匹配
            const wordMatch = searchText.match(regex);
            
            // 拼音匹配
            let pinyinMatchResult = null;
            if (pyMatch && /^[a-zA-Z0-9]/.test(keyword)) {
                pinyinMatchResult = pyMatch(searchText, keyword, { 
                    continuous: true, 
                    precision: 'start' 
                });
            }
            
            // 如果匹配，添加到结果
            if (wordMatch || pinyinMatchResult) {
                // 高亮匹配文字
                let matchedWord = '';
                if (wordMatch) {
                    matchedWord = wordMatch[0];
                } else if (pinyinMatchResult) {
                    matchedWord = getMatchedWord(searchText, pinyinMatchResult);
                }
                
                const highlightedText = matchedWord 
                    ? searchText.replace(new RegExp(matchedWord, 'gi'), `<strong>${matchedWord}</strong>`)
                    : searchText;
                
                results.push({
                    href,
                    title,
                    imgSrc,
                    highlightedText
                });
            }
        });
        
        // 渲染结果
        if (results.length > 0) {
            elements.searchResults.innerHTML = '';
            results.forEach(result => {
                const item = createResultItem(result);
                elements.searchResults.appendChild(item);
            });
            searchItems = elements.searchResults.querySelectorAll('.result-item');
            currentIndex = -1;
        } else {
            renderEmptyState('没有找到匹配的内容', 'fa-inbox');
        }
    }
    
    /**
     * 打开搜索框
     */
    function openSearch() {
        if (elements.overlay) {
            elements.overlay.style.display = 'block';
            if (elements.searchInput) {
                elements.searchInput.focus();
            }
        }
    }
    
    /**
     * 关闭搜索框
     */
    function closeSearch() {
        console.log('[本地搜索] 执行关闭操作');
        if (elements.overlay) {
            elements.overlay.style.display = 'none';
            if (elements.searchInput) {
                elements.searchInput.value = '';
                renderEmptyState('开始搜索本页内容', 'fa-lightbulb');
            }
            currentIndex = -1;
            console.log('[本地搜索] 搜索框已关闭');
        } else {
            console.warn('[本地搜索] overlay元素不存在，无法关闭');
        }
    }
    
    /**
     * 切换搜索框
     */
    function toggleSearch() {
        if (elements.overlay.style.display === 'none' || !elements.overlay.style.display) {
            openSearch();
        } else {
            closeSearch();
        }
    }
    
    /**
     * 高亮选中项
     */
    function highlightItem(index) {
        searchItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('highlight');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('highlight');
            }
        });
    }
    
    /**
     * 键盘导航
     */
    function handleKeyboard(e) {
        if (!searchItems || searchItems.length === 0) return;
        
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = currentIndex <= 0 ? searchItems.length - 1 : currentIndex - 1;
                highlightItem(currentIndex);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = currentIndex >= searchItems.length - 1 ? 0 : currentIndex + 1;
                highlightItem(currentIndex);
                break;
                
            case 'Enter':
                if (currentIndex !== -1 && searchItems[currentIndex]) {
                    const link = searchItems[currentIndex].querySelector('a');
                    if (link) link.click();
                }
                break;
                
            case 'Escape':
                closeSearch();
                break;
        }
    }
    
    /**
     * 绑定事件
     */
    function bindEvents() {
        // 搜索输入事件
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', debounce(performSearch, CONFIG.debounceDelay));
        }
        
        // 搜索按钮点击
        if (elements.searchBtn) {
            elements.searchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                toggleSearch();
            });
        }
        
        // 关闭按钮
        if (elements.closeBtn) {
            elements.closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeSearch();
                console.log('[本地搜索] 关闭按钮被点击');
            });
        } else {
            console.warn('[本地搜索] 关闭按钮未找到');
        }
        
        // 点击遮罩关闭
        if (elements.overlay) {
            elements.overlay.addEventListener('click', function(e) {
                if (e.target === elements.overlay) {
                    closeSearch();
                    console.log('[本地搜索] 点击遮罩关闭');
                }
            });
        }
        
        // 键盘事件
        document.addEventListener('keydown', function(e) {
            // Ctrl+F 打开搜索
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                toggleSearch();
            }
            
            // 搜索框打开时的键盘导航
            if (elements.overlay && elements.overlay.style.display === 'block') {
                handleKeyboard(e);
            }
        });
    }
    
    /**
     * 初始化
     */
    function init() {
        initElements();
        bindEvents();
        console.log('[本地搜索] 初始化完成');
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
