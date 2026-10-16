// Remotion geeft bij een import van een beeld of letter de URL terug.
declare module "*.jpg" {
  const url: string;
  export default url;
}
declare module "*.png" {
  const url: string;
  export default url;
}
declare module "*.css";
