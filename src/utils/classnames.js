export default function classnames(...classes) {
  return classes.filter(i => Boolean(i)).join(' ');
}