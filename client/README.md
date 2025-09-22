# Plataforma de Curso

[URL 1](https://www.anderzone.com.br/)
ou
[URL 2](https://course-platform-mocha.vercel.app/)

## Processo Criativo

### Pré-Etapa

0. Apesar de não estar nas especificações, optei por desenvolver um Back-End (API) super simples, com NodeJS + Express + SQLite; essa mini API, foi implementada via container Docker, feita o upload no Docker Hub e, através do docker-compose, subi a aplicação via Portainer em uma VPS Oracle.

### Etapas

1. Definição da estrutura geral aproximada: comecei definindo uma estrutura genérica de trabalho, sem muitas especificidades; adicionei o repositório ao GitHub

2. Estruturação dos componentes mais complexos: nessa etapa comecei a desenvolver componentes que são mais trabalhosos de serem feitos e que precisam de uma atenção um pouco maior, como contextos e a parte das perguntas;

3. Pesquisa de padrões de mercado - Como não tinha um deseign no Figma, optei por pesquisar qual o padrão que o mercado usa em componentes e estruturas gerais de posicionamento, cores e etc.;

4. Contruindo UI/UX inicial - Aqui comecei a desenvolver cada componente com suas estrutura de estilos iniciais; separei cada componente por Layouts, criei padrões de cores, breakpoints, fontes e etc. Nessa etapa, a parte de mudança do Tema já estava funcionando e o site começava a ganahr sua forma final;

5. Finalização dos componentes - Nessa etapa testei o funcionamento de vários componentes, agora que alguns dependiam da interação com outros componentes; testei e corrigi bugs de visualizações, de implementações e outros; foi a primeira refinada nos componentes;

6. Ajustes design - Nesse momento, comecei a testar a aplicação do ponto de vista UX/UI; algumas sobreposições de cores não pareciam muito harmoniosas. Alterei tamanhos de fontes, tamanhos de componentes, cores e comportamentos gerais dos componentes;

7. Configurações - Fiz a configuração do repositório na Vercel; configurei o DNS da Vercel para um dominio pessoal e a aplicação já estava pública;

8. Ajustes componentes - Nessa etapa testei toda a aplicação: alterando local storage, testando temas, toggles, perguntas e repostas; alguns ajustes ainda foram necessários, como conteúdos e comentários nos componentes;

9. Documentação final, revisão dos conteúdos, análise no Google PageSpeed (e melhorias baseadas nessa análise).

---

## Decisões Técnicas

### Decisões de Layout

1. Optei por manter um padrão do mercado de cursos: uma Sidebar de fácil navegação. Mantive o mais minimalista possível, poderia, por exemplo, adicionar accordion nos módulos, barra de progresso de cada módulo e etc.;

2. O container principal mantive na aproximadamente na altura total da tela e sua largura delimitada pela Sidebar e pela largura da tela, assim adicionei um scroll a este e não precisei me preocupar com deslocamentos de layout e mudanças em cada dispositivos;

3. Mantive os links de todas as etapas visiveis o tempo todo ao usuário e o mais intuitivo possível; o header tem os controles da Sidenav e do tema. A Sidenav tem a navegação principal do curso;

4. Dividi o curso em Módulos e Tópicos, pois assim o usuário tem a noção aproximada de seu progresso e fica mais intuitiva a navegação;

5. O layout foi pensado para permitir um minimo de acessibilidade, como expandir a tela de conteúdo ao fechar a Sidenav; pois nem todo usuário tem uma largura de tela adequada;

6. Ao clicar em um item na Sidenav no Mobile, optei por fechar a Sidenav, pois assim o usuário visualiza a mudança no conteúdo; uma possível implementação que pensei, foi de adicionar botões de "Anterior" e "Próximo", dentro do container de conteúdo, assim o usuário poderia navegar pelos Módulos e Tópicos dentro do proprio conteúdo; porém optei por manter o mais inimalista e simples possível.

7. Coloquei Módulos iniciais mais focado em teoria e apresentação. A parte prática no final.

### Escolhas na arquitetura

1. Escolhi React com TypeScript e SCSS (sass module) para a criação da aplicação. O React tem suporte a navegação sem recarregamento da página e tem desempenho bastante satisfatório;

2. Uso mínimo de bibliotecas - Usei apenas bibioteca de ícones (Lucide) e o Lazy Load para imagens (posteriormente tirei do projeto), tentando diminuir ao máximo a dependência externa;

3. Preferência em criação de Hooks - Optei por criar Hooks de detecção de dispositivos (brakpoints mobile, tablet e desktop) e também de tratamento de requisição, abortando requisições feitas caso o componente esteja desmontado ou a URL tenha sido alterada;

4. uso do <picture> e <source> na imagem, dividindo imagens por tamanhos vs. dispositivos;

5. Flexibilidade de uso dos componentes (fácil intercambialidade);

7. Criação de uma estrutura JSON, simulando um CMS.

### O que eu ainda poderia ter feito

(optei por não fazer para manter o projeto minimalista)

1. Aumentar a questão da acessibilidade (inversão de cores para daltonismo, aumento tamanho de fonte, ...);

2. Aplicar Aria Labels em alguns componentes;

3. Colocar botão no final do Módulo/Tópico para passar para o próximo;

4. Gravar progresso dos Módulos/Tópicos asssistidos no Local Storage;

5. Exibir para o usuário as tentativas restantes de cada pergunta.

---

## Uso da IA

1. tipagem como "import modules from "@/src/data/cms/modules.json" with { type: "json" }", pedi para a IA mudar pois dava erro no ESLint. Foi resolvido adicionando "resolveJsonModule": true e "esModuleInterop": true ao tsconfig.json e usando o JSON como uma importação normal de componente

```json
prompt: Estou importando um JSON no React com with e type: "json", porém dá erro no ESLint. Qual o workaround para isso?
```

2. ajuste nessa tipagem "const inputs = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[name="options"]:checked, select[name="options"]'),);"

```json
prompt: No React TS, tenho o seguinte array que pode ser de inputs ou de options. Sugira a melhor tipagem.
```

3. Ajuda na substituição do @import (deprecated) no SCSS para o @use

```json
prompt: Meu projeto React está tendo warning do @import (deprecated), qual a alternativa para a importação no SCSS para contornar esse warning
```

4. Ajuda para criar uma estrutura JSON como um mini CMS

```json
prompt: Adapte essa estrutura JSON para uma um pouco mais completa, levando em consideração que será usada como um CMS simples
```

5. Ajuda para otimizar performance do site

```json
prompt: No PageSpeed estou perdendo ponto de tamanhos (bytes). Estou usando a Cloudinary como CDN de imagens. Qual o melhor formato de URL da Cloudinary para entregar imagens nos formatos ideais (WebP/AVIF): f_webp ou f_avif ?
```

---

## Desafios

1. A paleta de cores permitida é bem restrita. Como forma de contornar, pensei em usar a paleta de cores e expandi-la com transparências (Ex.: $color-gray-20);

2. Não pesquisei alguma API que trouxesse perguntas e respostas sobre front end. No entanto criei uma bem simples do zero e fiz o deploy em uma VPS;  

4. Como 'opcional' no final dos exercicios, na pontuação do usuário, coloquei um gráfico. Esse gráfico acabei descobrindo como fazer de modo bem simples (sem JS, puramente com SCSS) em um [Site](https://nikitahl.com/circle-progress-bar-css)

3. Testei no Google PageSpeed, quando estava usando a biblioteca (React Lazy Load Image Component); com a biblioteca as imagens não eram entregues otimizadas para cada dispositivo. No fim, tirei a biblioteca e usei as tags <pictures> e <source> combinadas com a tag <img> para entregar imagens com tamanhos diferentes para cada dispositivo.
