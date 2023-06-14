// import { useCallback, useEffect } from "react";

// function useDebouncedEffect(
//   effect: () => void,
//   delay: number,
//   deps: React.DependencyList
// ) {
//   const callback = useCallback(effect, deps);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       callback();
//     }, delay);

//     return () => clearTimeout(handler);
//   }, [callback, delay]);
// }

// export { useDebouncedEffect };

import { useEffect, useRef } from "react";

function useDebouncedEffect(func: () => void, delay: number, deps: any[]) {
  const callbackRef = useRef(func);
  //Первый эффект выполняется при изменении функции func. Он обновляет значение
  //callbackRef.current с актуальной функцией func. Это гарантирует, что при каждом изменении
  //func будет использовано актуальное значение функции.
  useEffect(() => {
    callbackRef.current = func;
  }, [func]);
  //Второй эффект выполняется при изменении delay или любой из зависимостей deps. Он создает
  //таймер с помощью setTimeout, который вызывает callbackRef.current()
  //с задержкой, указанной в delay. Таким образом, функция func будет вызвана только после окончания задержки.
  useEffect(() => {
    const handler = setTimeout(() => {
      callbackRef.current();
    }, delay);
    //Возвращаемая функция из второго эффекта выполняется при размонтировании компонента
    //и очищает таймер с помощью clearTimeout, чтобы избежать утечки памяти.
    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
}

export { useDebouncedEffect };
