class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-card');

        const title = document.createElement('h2');
        title.textContent = 'Lotto Number Generator';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');

        const button = document.createElement('button');
        button.textContent = 'Generate';

        const style = document.createElement('style');
        style.textContent = `
            .lotto-card {
                background: rgba(255, 255, 255, 0.1);
                padding: 2rem;
                border-radius: 15px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(10px);
            }
            h2 {
                color: white;
                margin-bottom: 1.5rem;
            }
            .numbers {
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            .number {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
            }
            button {
                background: #ff6b6b;
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-size: 1rem;
                cursor: pointer;
                transition: background 0.3s ease;
                box-shadow: 0 0 10px #ff6b6b, 0 0 20px #ff6b6b;
            }
            button:hover {
                background: #ff8e8e;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(numbersContainer);
        wrapper.appendChild(button);

        const generateNumbers = () => {
            const numbers = new Set();
            while (numbers.size < 6) {
                numbers.add(Math.floor(Math.random() * 45) + 1);
            }
            numbersContainer.innerHTML = '';
            Array.from(numbers).sort((a,b) => a-b).forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.setAttribute('class', 'number');
                numberElement.textContent = number;
                numbersContainer.appendChild(numberElement);
            });
        };

        button.addEventListener('click', generateNumbers);

        generateNumbers();
    }
}

customElements.define('lotto-generator', LottoGenerator);
