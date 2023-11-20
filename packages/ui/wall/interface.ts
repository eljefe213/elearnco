export interface IAvatar {
    id: Readonly<string>;
    bgColor: string;
    src: string;
    x: number;
    y: number;
    delay: number;
    rotation: number;
    scale: number;
  }


  export interface IProps {
    className?: string;
    width?:string
  }