import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;	
		padding: 0;
		border: 0;
		box-sizing: border-box;
	}

	@media (max-width: 1080px) {
	html {
			font-size: 93.75%;  // 15px
		}
	}

	@media (max-width: 720px) {
		html {
			font-size: 87.5%;   // 14px
		}
	}

	html, body {
		width: 100%;	
	}

  body {
		//background: #f8f8f8;
		background: ${({theme}) => theme.background};
		color: ${({theme}) => theme.color};
		height: 100vh;
		transition: all 0.50s linear;
		width: 100%;
  }
  
	body, input, textarea, button {
		font: 400 1rem 'Roboto', sans-serif;
	}
`