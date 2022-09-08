const example2Left = document.querySelector('#example2-left');
const example2Right = document.querySelector('#example2-right');
let dragEl = null;

const index = (el) => {
  let index = 0;
  while(el = el.previousElementSibling) {
    index ++;
  }
  return index;
}

const bindEvent = (el) => {

  const dragStart = (e) => {
    dragEl = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', e.target.textContent);
  }

  const drop = () => {
    el.removeEventListener('dragstart', dragStart)
    el.removeEventListener('drop', drop)
  }

  el.addEventListener('mousedown', ({ target }) => {
    target.draggable = true;
    el.addEventListener('dragstart', dragStart)
    el.addEventListener('dragover', (e) => {
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      const { target } = e;
      const after = index(dragEl) < index(target)
      const nextSibling = target.nextElementSibling;
      target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
    })
    el.addEventListener('drop', drop)
  })
}

bindEvent(example2Left)
bindEvent(example2Right)

/**
 * 1.0 
 * 1. 实现基本的拖拽 √
 * 2. 利用拖拽实现排序 √    其实就是判断两个元素的位置，然后执行insertBefore，直接把元素调换
 * 1.0版本就完成了
 */

/** 
 * 2.0
 * 1. 实现组间拖拽
 * 
 */