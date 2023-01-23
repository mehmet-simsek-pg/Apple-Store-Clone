import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../redux/basketSlice";
import { signIn, signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const items = useSelector(selectBasketItems);
  return (
    <header className="app__header_wrapper">
      <div className="app__header">
        <Link href="/">
          <div className="app__header-logo">
            <Image
              src="https://rb.gy/vsvv2o"
              fill
              alt=""
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
      </div>
      <div className="app__header-links">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="headerIcons">
        <MagnifyingGlassIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {items.length > 0 && (
              <span className="shoppingBagCount">{items.length}</span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={session.user?.image || "../../assets/profile_image"}
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
}

export default Header;
