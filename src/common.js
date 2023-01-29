import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import url from 'url';
import $ from 'jquery';
import { useTranslation } from 'react-i18next';

export default function useHelper(e) {
  const { t, i18n } = useTranslation('common');
  const location = useLocation();
  const history = useHistory();

  const go = (e, link, hiddenFooter) => {
    e.preventDefault();
    const isFromHome = location.pathname === '/';
    var u;
    if (link) {
      // chỉ về trang chủ
      u = url.parse(link);
    } else {
      u = url.parse(e.target.href);
      // if (u.pathname === '/')
      //     link = '/' + u.hash
      // else
      //     link = u.pathname
    }

    const isToHome = u.pathname === '/';
    const to =
      u.pathname +
      (u.hash === null ? '' : u.hash) +
      (u.query === null ? '' : '?' + u.query);

    if (isFromHome && isToHome) {
      window.location.href = to;
    } else if (isToHome) {
      history.push(to);
      setTimeout(function () {
        window.location.href = to;
      }, 1000);
    } else {
      history.push(to);
    }

    if (hiddenFooter) $('#footer').addClass('hidden');
  };
  const errorHandler = (res) => {
    if (res.status === 200) return;
    else if (res.status === 401) {
      history.push('/login');
    } else if (res.status === 404) {
    } else {
      console.log(res.statusText);
    }
  };

  const showFooter = () => {
    $('footer').removeClass('hidden');
  };

  function displayDate(date) {
    if (!date) return '';
    date = date.split('T')[0];
    const arr = date.split('-');
    return arr[2] + '/' + arr[1] + '/' + arr[0];
  }

  function reduceBodyHeight() {
    $('#body').removeClass('height-1000').addClass('height-540');
    return () => {
      $('#body').removeClass('height-540').addClass('height-1000');
    };
  }
  function ckeditor200() {
    $('.ckeditor200 > div > div > div').css('height', '200px');
  }

  function setupCkfinder() {
    const script = document.createElement('script');
    script.async = true;
    script.innerHTML = `CKFinder.setupCKEditor();`;
    document.body.appendChild(script);
  }
  function put(controller, data, backLink, imageElement) {
    if (!data.Title) {
      alert('Please input Title!');
      return;
    }
    if (!data.Link) {
      alert('Please input Path!');
      return;
    }
    if (imageElement !== undefined)
      data.Image = document.getElementById(imageElement).innerHTML;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    };
    fetch(controller + data.ID, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          history.push(backLink);
        }
        errorHandler(res);
      })
      .catch((error) => console.error(error.message));
  }

  function post(controller, data, backLink, imageElement) {
    if (!data.Title) {
      alert('Please input Title!');
      return;
    }
    if (!data.Link) {
      alert('Please input Path!');
      return;
    }
    if (imageElement !== undefined)
      data.Image = document.getElementById(imageElement).innerHTML;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data),
    };
    fetch(controller, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          history.push(backLink);
        }
        errorHandler(res);
      })
      .catch((error) => console.error(error.message));
  }

  function selectedMenuItem() {
    const menuItems = [
      'home',
      'about',
      'solutions',
      'projects',
      'news',
      'service',
      'career',
      'contact',
    ];
    var selectedMenuItem = location.pathname.split('/')[1];
    if (selectedMenuItem === '') selectedMenuItem = 'home';
    menuItems.forEach((item) => {
      if (item === selectedMenuItem) $('.item-' + item).addClass('selected');
      else $('.item-' + item).removeClass('selected');
    });
  }

  async function fetchData(
    controller,
    setFunction,
    title,
    callbackFunction,
    noScroll
  ) {
    var url =
      controller.indexOf('?page=') > 0 || controller.indexOf('?q=') > 0
        ? controller + '&lang=' + i18n.language.substring(0, 2)
        : controller + '?lang=' + i18n.language.substring(0, 2);
    fetch(url)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((result) => {
        setFunction(result);
        if (result) {
          if (title === undefined && result.Title)
            document.title = TITLE_PREFIX + result.Title;
          else if (title !== undefined) document.title = TITLE_PREFIX + title;

          if (callbackFunction) callbackFunction();
          if (!noScroll) window.scrollTo(0, 0);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function searchSubmit(e, q) {
    e.preventDefault();
    history.push('/search?q=' + q);
  }

  function goToTop(toTop = true) {
    $('.showMenu').on('click', () => {
      showMenu();
      if (toTop) window.scrollTo(0, 0);
    });
  }

  function showMenu() {
    $('.header').removeClass('hideNavi');
    const script = document.createElement('script');
    script.innerHTML = 'toTop = 1;';
    script.async = true;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  function handleChange(event, setFunction) {
    const { name, type } = event.target;
    const value =
      type === 'checkbox' ? event.target.checked : event.target.value;
    setFunction({ [name]: value });
  }

  function fetchDataAdmin(controller, setData, callBack) {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('jwt'),
      },
    };
    fetch(controller, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          if (callBack) callBack();
          return res.json();
        }
        errorHandler(res);
      })
      .then((res) => setData(res))
      .catch((error) => console.error(error.message));
  }

  function setTimeoutCkeditor200() {
    setTimeout(ckeditor200, 200);
  }

  function getTitle(text) {
    const menu = ['/solutions', '/projects', '/news'];
    if (menu.includes(location.pathname)) return text;
  }

  return {
    go,
    errorHandler,
    showFooter,
    displayDate,
    reduceBodyHeight,
    ckeditor200,
    setupCkfinder,
    put,
    post,
    selectedMenuItem,
    fetchData,
    searchSubmit,
    goToTop,
    showMenu,
    handleChange,
    fetchDataAdmin,
    setTimeoutCkeditor200,
    getTitle,
  };
}

export function generatePath(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\W+/g, '-')
    .toLowerCase();
}

export const controllers = {
  projects: '/api/projects/',
  solutions: '/api/solutions/',
  news: '/api/news/',
  career: '/api/career/',
  changePassword: '/api/changepassword',
  contact: '/api/contact',

  pages: {
    home: '/api/pages/home',
    about: '/api/pages/about',
    service: '/api/pages/service',
  },
  client: {
    solutions: '/api/client/solutions/',
    projects: '/api/client/projects/',
    news: '/api/client/news/',
    newsPage: '/api/client/news?page=',
    career: '/api/client/career/',
  },
  search: '/api/search?q=',
  links: '/api/links/',
};

export const TITLE_PREFIX = 'Vietcomltd: ';
export const DEFAULT_IMAGE = '/images/image-icon.png';
