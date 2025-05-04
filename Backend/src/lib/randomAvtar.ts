export default function RandomAvtar(){
    let maxImg = 70
    const id = Math.floor(Math.random() * maxImg) + 1;
  return `https://i.pravatar.cc/150?img=${id}`;

}