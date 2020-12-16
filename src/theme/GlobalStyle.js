import { createGlobalStyle } from 'styled-components';
import { boxShadow } from './boxShadow';
import {colours} from './colours';
import { radius } from './radius';
import { spacing } from './spacing';
import { textSize } from './textSize';

/**
 * This is base reset created by Tailwind called Preflight.
 * https://tailwindcss.com/docs/preflight
 */

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  -moz-tab-size: 4;
  tab-size: 4;
}

html {
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

body, html, #root {
  height: 100%;
}

body {
  margin: 0;
  background-color ${colours.gray['100']};
  color: ${colours.gray['400']};
}

body {
  font-family:
    'Poppins',
		system-ui,
		-apple-system,
		'Segoe UI',
		Roboto,
		Helvetica,
		Arial,
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji';
}

canvas {
  position: fixed;
  top: 0; right: 0; left: 0; bottom: 0;
  z-index: 999;
}

hr {
  height: 0;
  color: inherit;
}

abbr[title] {
  -webkit-text-decoration: underline dotted;
          text-decoration: underline dotted;
}

b,
strong {
  font-weight: bolder;
}

code,
kbd,
samp,
pre {
  font-family:
		ui-monospace,
		SFMono-Regular,
		Consolas,
		'Liberation Mono',
		Menlo,
		monospace; /* 1 */
  font-size: 1em; /* 2 */
}

small {
  font-size: 80%;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}


table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
}


button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}


button,
select { /* 1 */
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
}

::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

:-moz-focusring {
  outline: 1px dotted ButtonText;
}

:-moz-ui-invalid {
  box-shadow: none;
}

legend {
  padding: 0;
}

progress {
  vertical-align: baseline;
}


::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

summary {
  display: list-item;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

button {
  background-color: transparent;
  background-image: none;
}

button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

fieldset {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 1 */
  line-height: 1.5; /* 2 */
}

body {
  font-family: inherit;
  line-height: inherit;
}

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

hr {
  border-top-width: 1px;
}

img {
  border-style: solid;
}

textarea {
  resize: vertical;
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}

button,
[role="button"] {
  cursor: pointer;
}

table {
  border-collapse: collapse;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

button,
input,
optgroup,
select,
textarea {
  padding: 0;
  line-height: inherit;
  color: inherit;
}

pre,
code,
kbd,
samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

img,
video {
  max-width: 100%;
  height: auto;
}

.block-picker {
  margin-top: ${spacing[4]};
  border-radius: ${radius.sm};
  overflow: hidden;
  width: 100% !important;
  box-shadow: none !important;
  
  > div:nth-child(2) {
    border-radius: 0 !important;
  }

  > div {
    width: 100% !important;
  }

  span > div {
    box-shadow: ${boxShadow.sm} !important;
    height: 34px !important;
    width: 34px !important;
  }

  input {
    width: 100% !important;
    background: ${colours.gray[200]};
    border: 0 !important;
    padding: ${spacing[1]} ${spacing[3]} !important;
    font-size: ${textSize.sm} !important;
    height: auto !important;
    color: ${colours.gray[400]} !important;
    box-shadow none !important;
  }
}
`