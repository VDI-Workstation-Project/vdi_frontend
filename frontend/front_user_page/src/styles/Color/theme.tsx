import DarkLogo from "../../assets/logo/logo_images/hmlogo_white.png";
import LightLogo from "../../assets/logo/logo_images/hmlogo_green.png";



const lightTheme = {
    colors: {
        background: "#ffffff",
        backgroundfliped: "#22272e",
        contentBackground: "#f4f4f4",
        pointColor: "#89B2E9",
        maintext: "#f4f4f4",
        subtext: "#888888",
        label: "#000000",
        inputBackground: "#f4f4f4",
        borderColor: "#bcbec0",
        contentsborderColor: "#bcbec0",
        mainColor: "rgba(50, 136, 69, 1);",
        boldColor: "#0B3112;",
        mainColorGradient: "radial-gradient(50% 50% at 50% 50%, rgb(27.44, 134.94, 0.56) 0%, rgb(0, 77.56, 9.05) 100%)",
        menuItemHoverBackground: "rgba(50, 136, 69, 1);",
        bordercolor: "rgba(0, 0, 0, 0.25)",
        hoverColor: "#ffffff"
    },
    image: {
        mainLogo: {LightLogo}
    },
    fonts: {

        medium: "NotoSansKR, Medium, sans-serif ",
        bold: "Gilroy-Bold-☞, Helvetica"

    }
};

const darkTheme = {
    colors: {
        pointColor: "#646cff",
        background: "#22272e",
        backgroundfliped: "#ffffff",
        contentBackground: "#000000",
        maintext: "#ffffff",
        subtext: "#999999",
        label: "#ffffff",
        inputBackground: "#333333",
        borderColor: "#696969",
        contentsborderColor: "#000000",
        mainColor: "#ffffff;",
        boldColor: "rgba(30, 90, 45, 1);",
        mainColorGradient: "radial-gradient(85% 85% at 50% 50%, rgb(0, 0, 0) 0%, rgb(0, 128, 0) 100%);",
        menuItemHoverBackground: "#f4f4f4",
        bordercolor: "rgba(200, 200, 200, 0.25)",
        hoverColor: "#000000"
    },
    fonts: {
        medium: "Gilroy-Medium-☞, Helvetica",
        bold: "Gilroy-Bold-☞, Helvetica"
    },
    image: {
        mainLogo: {DarkLogo}
    },
};
type darkTheme = typeof darkTheme;
type lightTheme = typeof lightTheme;

export { lightTheme, darkTheme };