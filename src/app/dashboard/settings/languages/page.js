"use client";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout/layout";
import Layoutsettings from "../../../../pop-ups/layout-settings";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const lang = [
  { language: "English", code: "en" },
  { language: "French", code: "fr" },
  { language: "Espagnol", code: "sp" },
];

export default function Languages() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [locale, setlocale] = useState("");
  const router = useRouter();
  const t = useTranslations("Settings");
  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
      ?.split("=")[1];

    if (cookieLocale) {
      setlocale(cookieLocale);
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setlocale(browserLocale);
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}`;
      router.refresh();
    }
  }, [router]);

  const changeLocal = (ln) => {
    console.log("Language changed to:", ln);
    setlocale(ln);
    document.cookie = `MYNEXTAPP_LOCALE=${ln}`;
    router.refresh();
  };

  return (
    <Layout page={"settings"}>
      <div className="flex sm:flex-row flex-col ">
        <Layoutsettings />{" "}
        <div className="mx-6 w-auto border rounded-md pt-4 sm:w-full space-y-8 mt-16 sm:mt-0 mb-12 sm:mb-8 pb-4 sm:pb-0 shadow-lg ">
          <div className="flex px-6 items-center justify-between flex-col sm:flex-row">
            <h1 className="text-xl font-semibold text-black">{t("language")}</h1>
          </div>
          <hr className="custom-hr" />
          <div className="px-6" style={{ marginTop: "13px" }}>
            <p className="settings-p">{t("language-description")}</p>
          </div>
          <div className="flex px-6  flex-col" style={{ marginTop: "18px" }}>
            <div className="flex flex-col gap-2">
              {lang.map((i, key) => (
                <div
                  key={key}
                  className="flex items-center space-x-3 mt-4 sm:w-1/2 w-auto sm:items-center"
                >
                  <input
                    type="radio"
                    name="language"
                    onChange={() => changeLocal(i.code)}
                    checked={locale === i.code}
                  />
                  <p
                    className={`custom-p-color ${
                      locale === i.code ? "settings-p" : "" // Fixed: compare code to code
                    }`}
                  >
                    {i.language}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
