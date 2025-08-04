document.addEventListener('DOMContentLoaded', function() {
    const koBtn = document.getElementById('ko-btn');
    const jaBtn = document.getElementById('ja-btn');
    let currentLang = 'ko';

    function switchLanguage(lang) {
        currentLang = lang;
        
        // 언어 토글 버튼 업데이트 (스위치 효과)
        const languageToggle = document.querySelector('.language-toggle');
        if (lang === 'ja') {
            languageToggle.classList.add('ja-active');
        } else {
            languageToggle.classList.remove('ja-active');
        }
        
        koBtn.classList.toggle('active', lang === 'ko');
        jaBtn.classList.toggle('active', lang === 'ja');
        
        document.documentElement.lang = lang === 'ko' ? 'ko' : 'ja';
        
        // 컨텐츠 페이드 아웃
        const elements = document.querySelectorAll('[data-ko][data-ja]');
        const container = document.querySelector('.container');
        
        container.style.opacity = '0.7';
        container.style.transform = 'translateY(5px)';
        container.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            elements.forEach(element => {
                const content = element.getAttribute(`data-${lang}`);
                element.innerHTML = content; // textContent 대신 innerHTML 사용
            });
            
            // 컨텐츠 페이드 인
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            // 툴팁 기능 재초기화
            setTimeout(() => {
                initializeTooltips();
            }, 100);
        }, 200);
    }

    function toggleCourseItem(courseItem) {
        const content = courseItem.querySelector('.course-content');
        const isCollapsed = courseItem.classList.contains('collapsed');
        
        if (isCollapsed) {
            // 열기
            courseItem.classList.remove('collapsed');
            const height = content.scrollHeight;
            content.style.height = height + 'px';
            
            // 애니메이션 완료 후 height를 auto로 설정
            setTimeout(() => {
                content.style.height = 'auto';
            }, 400);
        } else {
            // 닫기
            const height = content.scrollHeight;
            content.style.height = height + 'px';
            
            // 브라우저가 높이를 인식하도록 약간의 지연
            requestAnimationFrame(() => {
                courseItem.classList.add('collapsed');
            });
        }
    }

    function initializeAccordion() {
        const courseHeaders = document.querySelectorAll('.course-header');
        const courseContents = document.querySelectorAll('.course-content');
        
        // 초기 높이 설정
        courseContents.forEach(content => {
            content.style.height = 'auto';
        });
        
        courseHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const courseItem = this.parentElement;
                toggleCourseItem(courseItem);
            });
        });
    }

    function initializeScrollButton() {
        const scrollBtn = document.getElementById('scroll-btn');
        const scrollBtnIcon = scrollBtn.querySelector('.scroll-btn-icon');
        const scrollBtnText = scrollBtn.querySelector('.scroll-btn-text');
        
        function updateScrollButton() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // 페이지 맨 아래에 있는지 확인 (10px 정도의 여유를 둠)
            const isAtBottom = scrollTop >= scrollHeight - 10;
            // 페이지 맨 위에 있는지 확인 (10px 정도의 여유를 둠)
            const isAtTop = scrollTop <= 10;
            
            // 맨 아래에 있을 때만 "위로" 버튼으로 변경
            if (isAtBottom) {
                scrollBtn.classList.add('scroll-up');
                scrollBtnText.setAttribute('data-ko', '위로');
                scrollBtnText.setAttribute('data-ja', '上へ');
                scrollBtnText.textContent = currentLang === 'ko' ? '위로' : '上へ';
            } 
            // 맨 위에 있을 때만 "아래로" 버튼으로 변경
            else if (isAtTop) {
                scrollBtn.classList.remove('scroll-up');
                scrollBtnText.setAttribute('data-ko', '아래로');
                scrollBtnText.setAttribute('data-ja', '下へ');
                scrollBtnText.textContent = currentLang === 'ko' ? '아래로' : '下へ';
            }
            // 중간 위치에서는 버튼 상태를 유지 (변경하지 않음)
        }
        
        function handleScrollButtonClick() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // 페이지 맨 아래에 있는지 확인
            const isAtBottom = scrollTop >= scrollHeight - 10;
            
            if (isAtBottom) {
                // 맨 위로 스크롤
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 맨 아래로 스크롤
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
        
        // 스크롤 이벤트 리스너
        window.addEventListener('scroll', updateScrollButton);
        
        // 버튼 클릭 이벤트 리스너
        scrollBtn.addEventListener('click', handleScrollButtonClick);
        
        // 초기 상태 설정
        updateScrollButton();
    }

    koBtn.addEventListener('click', () => switchLanguage('ko'));
    jaBtn.addEventListener('click', () => switchLanguage('ja'));
    
    function initializeToggleAllButton() {
        const toggleAllBtn = document.getElementById('toggle-all-btn');
        const toggleAllIcon = toggleAllBtn.querySelector('.toggle-all-icon');
        const toggleAllText = toggleAllBtn.querySelector('.toggle-all-text');
        
        function updateToggleAllButton() {
            const courseItems = document.querySelectorAll('.course-item');
            const collapsedItems = document.querySelectorAll('.course-item.collapsed');
            
            if (collapsedItems.length === courseItems.length) {
                // 모든 항목이 닫혀있을 때 - "모두 열기" 버튼
                toggleAllBtn.classList.add('all-collapsed');
                toggleAllText.setAttribute('data-ko', '모두\n열기');
                toggleAllText.setAttribute('data-ja', 'すべて\n開く');
                toggleAllText.innerHTML = currentLang === 'ko' ? '모두<br>열기' : 'すべて<br>開く';
            } else {
                // 하나라도 열려있을 때 - "모두 닫기" 버튼
                toggleAllBtn.classList.remove('all-collapsed');
                toggleAllText.setAttribute('data-ko', '모두\n닫기');
                toggleAllText.setAttribute('data-ja', 'すべて\n閉じる');
                toggleAllText.innerHTML = currentLang === 'ko' ? '모두<br>닫기' : 'すべて<br>閉じる';
            }
        }
        
        function handleToggleAllClick() {
            const courseItems = document.querySelectorAll('.course-item');
            const collapsedItems = document.querySelectorAll('.course-item.collapsed');
            
            if (collapsedItems.length === courseItems.length) {
                // 모든 항목이 닫혀있으면 모두 열기
                courseItems.forEach(item => {
                    if (item.classList.contains('collapsed')) {
                        const content = item.querySelector('.course-content');
                        item.classList.remove('collapsed');
                        const height = content.scrollHeight;
                        content.style.height = height + 'px';
                        
                        setTimeout(() => {
                            content.style.height = 'auto';
                        }, 400);
                    }
                });
            } else {
                // 하나라도 열려있으면 모두 닫기
                courseItems.forEach(item => {
                    if (!item.classList.contains('collapsed')) {
                        const content = item.querySelector('.course-content');
                        const height = content.scrollHeight;
                        content.style.height = height + 'px';
                        
                        requestAnimationFrame(() => {
                            item.classList.add('collapsed');
                        });
                    }
                });
            }
            
            // 버튼 상태 업데이트
            setTimeout(updateToggleAllButton, 500);
        }
        
        // 버튼 클릭 이벤트 리스너
        toggleAllBtn.addEventListener('click', handleToggleAllClick);
        
        // 초기 상태 설정
        updateToggleAllButton();
        
        // 개별 아코디언이 변경될 때마다 버튼 상태 업데이트
        return updateToggleAllButton;
    }

    koBtn.addEventListener('click', () => switchLanguage('ko'));
    jaBtn.addEventListener('click', () => switchLanguage('ja'));
    
    switchLanguage('ko');
    initializeAccordion();
    initializeScrollButton();
    const updateToggleAllButton = initializeToggleAllButton();
    
    // 개별 아코디언 클릭 시 모두열기/닫기 버튼 상태 업데이트
    document.addEventListener('click', function(e) {
        if (e.target.closest('.course-header')) {
            setTimeout(updateToggleAllButton, 500);
        }
    });

    // 툴팁 기능 초기화
    function initializeTooltips() {
        const tooltip = document.getElementById('tooltip');
        const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
        
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', function(e) {
                const tooltipText = this.getAttribute('data-tooltip');
                tooltip.textContent = tooltipText;
                
                // 툴팁 위치 계산
                const rect = this.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                let left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2);
                let top = rect.top - tooltip.offsetHeight - 10;
                
                // 화면 경계 체크
                if (left < 10) left = 10;
                if (left + tooltip.offsetWidth > window.innerWidth - 10) {
                    left = window.innerWidth - tooltip.offsetWidth - 10;
                }
                if (top < 10) {
                    top = rect.bottom + 10;
                }
                
                tooltip.style.left = left + window.scrollX + 'px';
                tooltip.style.top = top + window.scrollY + 'px';
                
                setTimeout(() => {
                    tooltip.classList.add('show');
                }, 50);
            });
            
            trigger.addEventListener('mouseleave', function() {
                tooltip.classList.remove('show');
            });
        });
    }

    initializeTooltips();
});