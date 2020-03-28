export class Category{
  static id<T>(id: T): T{
    return id;
  }
  static compose<A,B,C>(f: (x: A) => B, g: (x: B) => C): (x: A)=>C{
    return (x: A) => {
      return g(f(x))
    }
  }
}

type DD = {
  id: string;
}
const dd: DD = {
  id: "dd"
}

Category.id(dd);

const i = false;

function f(x: boolean): number{
  return x ? 1: 0;
}
function g(x: number): boolean{
  return false;
}
function h(x: boolean): number{
  return 30;
}


Category.compose(Category.compose(f, g), h)(i) === 
Category.compose(f, Category.compose(g, h))(i)


