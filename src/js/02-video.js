//* 1. Ознайомся з документацією бібліотеки Vimeo плеєра.
//* 2. Додай бібліотеку як залежність проекту через npm.
//* 3. Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, 
//*     що у тебе плеєр доданий як npm пакет, а не через CDN.
//* 4. Вивчи документацію методу on() і почни відстежувати подію timeupdate - оновлення часу відтворення.
//? 5. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
//? 6. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
//* 7. Додай до проекту бібліотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.

//підключаю бібліотеки
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = document.getElementById("vimeo-player");

const player = new Player(vimeoPlayer);
const VIDEO_TIME = "videoplayer-current-time";

if (localStorage.getItem(VIDEO_TIME)) {
    player.setCurrentTime(localStorage.getItem(VIDEO_TIME));
}

player.on("timeupdate", throttle(currentTime, 1000));

function currentTime(event) {
    localStorage.setItem(VIDEO_TIME, event.seconds);
}



