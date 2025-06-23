// Инициализация WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Раскрываем на весь экран

// Загрузка данных пользователя
async function loadUserData() {
    const userId = tg.initDataUnsafe.user?.id;
    
    try {
        const response = await fetch('https://maze-fierce-energy.glitch.me/get_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId })
        });
        
        const data = await response.json();
        document.getElementById('user-name').textContent = data.name || 'Пользователь';
        document.getElementById('user-points').textContent = data.points || 0;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Добавление баллов
async function addPoints(points) {
    const userId = tg.initDataUnsafe.user?.id;
    
    try {
        const response = await fetch('https://maze-fierce-energy.glitch.me/add_points', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                user_id: userId,
                points: points 
            })
        });
        
        const data = await response.json();
        document.getElementById('user-points').textContent = data.new_points;
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

// Загружаем данные при старте
loadUserData();
