export function changeStorage(switchBtnText) {

  const nav = document.querySelector('.nav');
  const containerBtnChange = document.createElement('div');
  const btnChange = document.createElement('button');
  btnChange.classList.add('btn');
  btnChange.classList.add('btn-info');

  if (localStorage.getItem('paramBtn') === 'true') {
    btnChange.textContent = 'Перейти на локальное хранилище';
  } else {
    btnChange.textContent = 'Перейти на серверное хранилище';
  }

  containerBtnChange.style.textAlign = 'center';
  containerBtnChange.style.marginBottom = '50px';
  containerBtnChange.style.marginTop = '20px';

  containerBtnChange.append(btnChange);
  nav.before(containerBtnChange);

  btnChange.addEventListener('click', () => {
    switchBtnText(btnChange);
  })

  
}
