/* 控制台输出 */
function makeMulti(string) {
    let l = String(string)
    l = l.substring(l.indexOf("/*") + 3, l.lastIndexOf("*/"))
    return "%c " + l
};
const string = function () {
    /*
      ______            __    _           
     /_  __/_  ______  / /   (_)___  ____ 
      / / / / / / __ \/ /   / / __ \/ __ \
     / / / /_/ / /_/ / /___/ / / / / /_/ /
    /_/  \__,_/\____/_____/_/_/ /_/\__, / 
                                  /____/  
    */
};
console.log(makeMulti(string), "color: #0084ff");
console.log("\n %c 驼铃电商工具箱 %c dy.202802.xyz \n", "color: #ffffff; background: #0084ff; padding:5px 0;", "background: #fadfa3; padding:5px 0;");

/* 弹窗一：say hello baby */
// $(document).ready(function () {
//     // 检查是否是 Chromium 内核且版本小于 100
//     function isOldChromium() {
//         try {
//             const userAgent = navigator.userAgent;
//             const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
//             if (chromeMatch && chromeMatch[1]) {
//                 const chromeVersion = parseInt(chromeMatch[1], 10);
//                 return chromeVersion < 100;
//             }
//             return false;
//         } catch (error) {
//             console.error("Error detecting Chromium version:", error);
//             // 出现异常时默认不弹出弹窗
//             return true;
//         }
//     }
//
//     if (isOldChromium()) {
//         return;
//     }
//
//     // 检查本地存储中的标志位，如果标志位为 true，则不再弹出弹窗
//     let lastPopupTime = localStorage.getItem("FUCK_GIZAWORKS");
//     lastPopupTime = new Date(lastPopupTime).getTime();
//     const currentTime = new Date().getTime();
//     const timeDifferenceInDays = Math.floor((currentTime - lastPopupTime) / (1000 * 60 * 60 * 24));
//     if (!lastPopupTime || timeDifferenceInDays >= 10) {
//         Swal.fire({
//             // width: 300,
//             title: "欢迎",
//             // text: "SpiderBox 仍处于初期建设当中，<br>欢迎扫码关注站长公众号：虫技",
//             html: `
//             <!-- <font style="font-weight:bold; color:red;">SpiderBox 仍处于初期建设当中</font>-->
//             <!-- <br>-->
//             欢迎扫码关注站长公众号：虫技
//             <br>
// <!--            <p style="color:#DC1729;"><strong>本站与 kgtools.cn 等其他网站没有任何关系</strong></p>-->
// <!--            <p style="color:#DC1729;"><strong>本站于2023年8月13日原创首发，<a href="https://mp.weixin.qq.com/s/7vFpmhvU8-DCONlvlklMTQ" target="_blank">点此了解详情</a></strong></p>-->
//             <strong><a href="https://mp.weixin.qq.com/s/ZDeJM7KAbst8er8zLRhdSg" target="_blank">点此了解近期更新情况</a></strong>
//             `,
//             showCancelButton: true,
//             confirmButtonText: "俺知道了",
//             cancelButtonText: "烦死了，近期不再弹出！",
//             confirmButtonColor: "#0084ff",
//             imageUrl: "https://static.wukongsec.com/spiderbox/images/qrcode/IT_BOB.jpg",
//             // imageUrl: "https://spiderapi.cn/img/qrcode/gzh.png",
//             // imageWidth: 300,
//             // imageHeight: 300,
//             imageAlt: "公众号：虫技",
//             showClass: {
//                 popup: "swal2-show"
//             },
//             hideClass: {
//                 popup: "swal2-hide"
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//
//             } else {
//                 localStorage.setItem("FUCK_GIZAWORKS", new Date().toISOString());
//             }
//         });
//         const popupContainer = document.querySelector('.swal2-container');
//         popupContainer.style.zIndex = '9999';
//     }
// });

/* 弹窗二：交流群 */
// $(document).ready(function () {
//     const showGroupElement = document.getElementById("show-group");
//     showGroupElement.addEventListener("click", function () {
//         Swal.fire({
//             text: "扫码加入QQ / 微信交流群",
//             confirmButtonText: "俺知道了",
//             confirmButtonColor: "#0084ff",
//             imageWidth: 420,
//             imageUrl: "https://static.wukongsec.com/spiderbox/images/group.webp",
//             imageAlt: "QQ / 微信交流群",
//             showClass: {
//                 popup: "swal2-show"
//             },
//             hideClass: {
//                 popup: "swal2-hide"
//             },
//             allowOutsideClick: false,
//             customClass: {
//                 image: "custom-swal-image"
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.close();
//             }
//         });
//         const popupContainer = document.querySelector(".swal2-container");
//         popupContainer.style.zIndex = "9999";
//     })
// });

/* 弹窗四：打赏赞助 */
// $(document).ready(function () {
//     const showSponsorElement = document.getElementById("show-sponsor");
//     showSponsorElement.addEventListener("click", function () {
//         Swal.fire({
//             text: "所有打赏、赞助将用于 SpiderBox 的域名、服务器、COS 等项目续费。",
//             confirmButtonText: "俺知道了",
//             confirmButtonColor: "#0084ff",
//             imageWidth: 420,
//             imageUrl: "https://static.wukongsec.com/spiderbox/images/sponsor.webp",
//             imageAlt: "微信 / 支付宝收款码",
//             showClass: {
//                 popup: "swal2-show"
//             },
//             hideClass: {
//                 popup: "swal2-hide"
//             },
//             allowOutsideClick: false,
//             customClass: {
//                 image: "custom-swal-image"
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.close();
//             }
//         });

//         const popupContainer = document.querySelector(".swal2-container");
//         popupContainer.style.zIndex = "9999";
//     })
// });

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

/* 夜间(日间)模式记忆判断 */
(function () {
    let nightCookie = getCookie('_TUOLING_NIGHT_') === '1';
    if (nightCookie) {
        document.body.classList.remove('io-grey-mode');
        document.body.classList.add('io-black-mode');
        console.log('夜间模式开启');
        $(".switch-dark-mode").attr("data-original-title", "日间模式");
        $(".mode-ico").removeClass("icon-night");
        $(".mode-ico").addClass("icon-light");
    }
})();

/* 夜间(日间)模式切换 */
// $("#search-bg").css("background-image", "url({{ with $.Site.Params.cdnURL }}{{ . }}{{ end }}{{ $.Site.Params.images.searchImageL }})");   //默认浅色背景
function switchNightMode() {
    const cookieName = "_TUOLING_NIGHT_"
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);  // 设置为 1 年后过期

    let nightCookie = getCookie(cookieName) === '1';
    let nightClass = document.body.classList.contains('io-black-mode');
    let night = nightCookie || nightClass;
    // let night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';

    if (night) {
        // $("#search-bg").css("background-image", "url({{ with $.Site.Params.cdnURL }}{{ . }}{{ end }}{{ $.Site.Params.images.searchImageD }})")
        document.body.classList.remove('io-black-mode');
        document.body.classList.add('io-grey-mode');
        document.cookie = `${cookieName}=0; expires=${date.toUTCString()}; path=/`;
        console.log('切换至日间模式');
        $(".switch-dark-mode").attr("data-original-title", "夜间模式");
        $(".mode-ico").removeClass("icon-light");
        $(".mode-ico").addClass("icon-night");
    } else {
        // $("#search-bg").css("background-image", "url({{ with $.Site.Params.cdnURL }}{{ . }}{{ end }}{{ $.Site.Params.images.searchImageL }})");
        document.body.classList.remove('io-grey-mode');
        document.body.classList.add('io-black-mode');
        document.cookie = `${cookieName}=1; expires=${date.toUTCString()}; path=/`;
        console.log('切换至夜间模式');
        $(".switch-dark-mode").attr("data-original-title", "日间模式");
        $(".mode-ico").removeClass("icon-night");
        $(".mode-ico").addClass("icon-light");
    }
}

/* 图片懒加载 */
window.addEventListener('DOMContentLoaded', (event) => {
    let observer = new IntersectionObserver((entries, observe) => {
        entries.forEach(item => {
            // 获取当前正在观察的元素
            let target = item.target
            if (item.isIntersecting && target.dataset.src) {
                target.src = target.dataset.src
                // 删除data-src属性
                target.removeAttribute("data-src")
                // 取消观察
                observe.unobserve(item.target)
            }
        })
    })
    //   let allLazyImgs = document.querySelectorAll(".lazy")
    //   allLazyImgs.forEach(item => {
    //       // 遍历观察元素
    //       observer.observe(item)
    //   })
    let allLazyImgs = document.querySelectorAll(".lazy")
    let isScrolling = false;

    window.addEventListener('scroll', function () {
        if (!isScrolling) {
            window.requestAnimationFrame(function () {
                allLazyImgs.forEach(item => {
                    if (isElementInViewport(item) && item.dataset.src) {
                        observer.observe(item);
                    }
                });
                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    function isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    allLazyImgs.forEach(item => {
        if (isElementInViewport(item) && item.dataset.src) {
            observer.observe(item);
        }
    });
});

/* 初始化检查侧边栏是否需要展开 */
window.addEventListener('DOMContentLoaded', (event) => {
    // 检查 localStorage 中的 mini_sidebar 是否为 true，默认 true
    const isMiniSidebar = localStorage.getItem('mini_sidebar') === 'true' || localStorage.getItem('mini_sidebar') === null;
    const sidebarElement = document.getElementById('sidebar');

    if (isMiniSidebar) {
        sidebarElement.classList.add('mini-sidebar');
        sidebarElement.classList.remove('animate-nav');
        sidebarElement.style.width = '60px';
        $('.header-mini-btn input[type="checkbox"]').prop("checked", true);
    } else {
        sidebarElement.classList.add('animate-nav');
        sidebarElement.classList.remove('mini-sidebar');
        sidebarElement.style.width = '170px';
        $('.header-mini-btn input[type="checkbox"]').prop("checked", false);
    }
});

/* 欢迎弹窗 */
window.addEventListener('DOMContentLoaded', (event) => {
    // 检查本地存储中的标志位对应的时间
    let lastPopupTime = localStorage.getItem("_TUOLING_SHOW_START_POPUP_");
    lastPopupTime = new Date(lastPopupTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifferenceInDays = Math.floor((currentTime - lastPopupTime) / (1000 * 60 * 60 * 24));
    if (!lastPopupTime || timeDifferenceInDays >= 30) {  // 30 天内不再弹窗
        alertify.confirm(
            "欢迎访问驼铃电商工具箱",
            "📌 本站收集整理电商运营相关工具资源，助力商家更好地运营管理店铺！<br><br>" +
            "📧 如有问题或建议，欢迎联系：<a href='mailto:admin@itbob.cn'>admin@itbob.cn</a>",
            function () {},
            function () {
                localStorage.setItem("_TUOLING_SHOW_START_POPUP_", new Date().toISOString());
                alertify.success('30 天内不再弹出');
            }).set({
            labels: {ok: '知道了', cancel: '近期不再弹出'},
            'movable': false,
            'reverseButtons': true,
            'closable': false
        });
    }
});
