export function mapEventToState(setState: (x: string) => void){
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }
}