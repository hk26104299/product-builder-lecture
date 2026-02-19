class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        // Theme Toggle Container
        const themeToggle = document.createElement('div');
        themeToggle.setAttribute('class', 'theme-toggle');
        const themeButton = document.createElement('button');
        themeButton.setAttribute('id', 'theme-btn');
        themeButton.textContent = '🌓';
        themeButton.title = '화면 모드 변경';
        themeToggle.appendChild(themeButton);

        const title = document.createElement('h2');
        title.textContent = '당첨 예상 번호 생성';

        // Container for multiple sets
        const setsContainer = document.createElement('div');
        setsContainer.setAttribute('class', 'sets-container');

        const button = document.createElement('button');
        button.textContent = '지금 번호 받기';
        button.setAttribute('id', 'generate-btn');

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
            }
            .lotto-card {
                background: var(--card-background, rgba(255, 255, 255, 0.1));
                padding: 3rem;
                border-radius: 24px;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                position: relative;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .theme-toggle {
                position: absolute;
                top: 15px;
                right: 15px;
            }
            #theme-btn {
                background: none;
                border: none;
                font-size: 1.4rem;
                cursor: pointer;
                padding: 8px;
                transition: transform 0.2s ease, opacity 0.2s ease;
                opacity: 0.8;
                color: var(--text-color, white);
            }
            #theme-btn:hover {
                transform: scale(1.1);
                opacity: 1;
            }
            h2 {
                color: var(--text-color, white);
                margin-bottom: 2.5rem;
                font-size: 1.8rem;
                font-weight: 700;
                letter-spacing: -0.5px;
                transition: color 0.4s ease;
            }
            .sets-container {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                margin-bottom: 2.5rem;
            }
            .lotto-set {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1.5rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.05);
                transition: background 0.3s;
            }
            .lotto-set:hover {
                background: rgba(255, 255, 255, 0.08);
            }
            .set-label {
                font-size: 0.9rem;
                color: var(--text-color, white);
                opacity: 0.6;
                text-align: left;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .numbers {
                display: flex;
                gap: 0.75rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            .number {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: var(--number-background, white);
                color: var(--number-color, black);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.25rem;
                font-weight: bold;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                animation: popIn 0.35s cubic-bezier(0.26, 0.53, 0.74, 1.48) forwards;
                opacity: 0;
                transition: background 0.4s ease, color 0.4s ease;
            }
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            #generate-btn {
                background: var(--button-background, #ff6b6b);
                color: white;
                border: none;
                padding: 1.2rem 3rem;
                border-radius: 16px;
                font-size: 1.2rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: var(--button-shadow, 0 4px 15px rgba(255, 107, 107, 0.4));
                width: 100%;
            }
            #generate-btn:hover {
                background: var(--button-hover-background, #ff8e8e);
                transform: translateY(-3px);
                box-shadow: var(--button-shadow, 0 6px 20px rgba(255, 107, 107, 0.6));
            }
            #generate-btn:active {
                transform: translateY(0);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(themeToggle);
        wrapper.appendChild(title);
        wrapper.appendChild(setsContainer);
        wrapper.appendChild(button);

        // Theme management
        const applyTheme = (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        };

        const currentTheme = localStorage.getItem('theme') || 'light';
        applyTheme(currentTheme);

        themeButton.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(theme);
        });

        const generateNumbers = () => {
            setsContainer.innerHTML = '';
            
            for (let i = 0; i < 3; i++) {
                const setWrapper = document.createElement('div');
                setWrapper.setAttribute('class', 'lotto-set');
                
                const label = document.createElement('div');
                label.setAttribute('class', 'set-label');
                label.textContent = `조합 ${i + 1}`;
                
                const numbersDiv = document.createElement('div');
                numbersDiv.setAttribute('class', 'numbers');
                
                const numbers = new Set();
                while (numbers.size < 6) {
                    numbers.add(Math.floor(Math.random() * 45) + 1);
                }
                const sortedNumbers = Array.from(numbers).sort((a,b) => a-b);
                
                sortedNumbers.forEach((number, index) => {
                    const numberElement = document.createElement('div');
                    numberElement.setAttribute('class', 'number');
                    numberElement.style.animationDelay = `${(i * 6 + index) * 0.04}s`;
                    numberElement.textContent = number;
                    numbersDiv.appendChild(numberElement);
                });
                
                setWrapper.appendChild(label);
                setWrapper.appendChild(numbersDiv);
                setsContainer.appendChild(setWrapper);
            }
        };

        button.addEventListener('click', generateNumbers);
        generateNumbers();
    }
}

customElements.define('lotto-generator', LottoGenerator);
