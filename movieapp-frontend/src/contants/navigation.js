import { MdHomeFilled} from "react-icons/md";
import {PiTelevisionFill} from "react-icons/pi";
import {BiSolidMoviePlay} from "react-icons/bi";
import {IoSearchOutline } from "react-icons/io5";

export const navigation = [
  // Removed Dizi and Film
];

export const mobileNavigation = [
  {
    label : "Home",
    href : "/",
    icon : <MdHomeFilled/>
  },
  ...navigation,
  {
      label : "search",
      href : "/search",
      icon : <IoSearchOutline/>
  }
]