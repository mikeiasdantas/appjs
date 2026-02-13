# Leia com atenção
Utilizei por muitos anos desse código HTML+Javascript para desenvolver apps Android e iOS utilizando *Cordova (ainda era PhoneGap)* como framework Cross-platform.
Fui adicionando algumas funcionalidades ao código utilizando de `jQuery` e o `Materialize CSS`. Posteriormente incluí alguns outros plugins javascript para alguns efeitos (WOW.js) e um script para efeito Pull.
Aproveitei e criei um código simples para controlar as entradas e saídas de views do aplicativo.

Os frameworks mais utilizados hoje em dia ainda não eram bem conhecidos na época (~2015) e insisti por muitos anos me manter neste formato.
Não sei se alguém fará uso mas estou disponibilizando para quem tenha vontade de iniciar no mundo Javascript.
*Fiquem a vontade para quaisquer atualização.*

## Instalação
Simples. Copie todo projeto e rode o arquivo `index.html`.
Toda aplicação é executada no arquivo `app.js`, mas algumas coisas foram inseridas no `index.html` e que precisam ser adaptadas para sua necessidade.

## Utilização
No arquivo `app.js` existem classes e algumas delas são principais: `initialize`, `pageMain`, `openPage` e `closePage`.
A classe `pageHome` o nome já sugere o que é, porém é totalmente livre para alterá-la e/ou criar quantas desejar. Observe que a `pageMain` chama o `app.pageHome.page()` que é onde a página está criada.
Através do método `app.openPage()` é onde, de fato, traz a visualização da sua página criada. Deixei de exemplo um código simples utilizando o Materialize CSS como base.

### Sucesso!
