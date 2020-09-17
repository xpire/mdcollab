import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import purple from "@material-ui/core/colors/purple";
import lightGreen from "@material-ui/core/colors/lightGreen";
import grey from "@material-ui/core/colors/grey";

type Props = {
  children: React.ReactNode;
  darkMode: Boolean;
};

const MyThemeProvider: React.FunctionComponent<Props> = ({
  children,
  darkMode,
}: Props) => {
  
  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         primary: {
  //           main: "#CAA8F5",
  //           light: "#9A50B9",
  //           dark: "#462255",
  //         },
  //         type: prefersDarkMode ? "dark" : "light",
  //       },
  //     }),
  //   [prefersDarkMode]
  // );

  const elements = [
    "MuiAppBar",
    "MuiBackdrop",
    "MuiButton",
    "MuiCard",
    "MuiCheckbox",
    "MuiChip",
    "MuiDialog",
    "MuiDivider",
    "MuiDrawer",
    "MuiAccordion",
    "MuiExpansionPanel",
    "MuiLink",
    "MuiMenu",
    "MuiMenuItem",
    "MuiPaper",
    "MuiTab",
  ];

  const overrides = Object.fromEntries(
    elements.map((elem) => {
      return [
        [elem],
        {
          root: {
            transition: "background 0.25s linear",
          },
        },
      ];
    })
  );

  const commonTheme = {
    overrides: overrides,
  };

  // const commonTheme = {
  //   overrides: {
  //     // Style sheet name
  //     MuiAppBar: {
  //       // Name of the rule
  //       root: {
  //         transition: "background 0.25s linear",
  //       },
  //     },
  //   },
  // };

  console.log({ commonTheme });

  const darkTheme = createMuiTheme({
    ...commonTheme,
    palette: {
      primary: {
        main: grey[700],
      },
      secondary: {
        main: purple[500],
      },
      type: "dark",
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: "#CAA8F5",
        light: "#9A50B9",
        dark: "#462255",
      },
      secondary: {
        main: lightGreen[500],
      },
    },
  });

  return (
    <ThemeProvider
      // theme={theme}
      theme={darkMode ? darkTheme : lightTheme}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MyThemeProvider;
