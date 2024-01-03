import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NoPage() {
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  useEffect(() => {
    // Get the current URL
    if (window.location.href.includes("token")) {
      const url = new URL(window.location.href);

      // Get the 'token' query parameter
      const accessToken = url.searchParams.get("token");
      setCookie("accessToken", accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // Expires after 1week
        sameSite: true,
      });
      navigate("/home");
    }
  }, []);

  return <div>NoPage</div>;
}
