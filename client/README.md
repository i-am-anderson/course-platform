# Plataforma de Curso
[Front-End](https://course-platform-mocha.vercel.app/)

## Uso da IA
1 - tipagem como "import modules from "@/src/data/cms/modules.json" with { type: "json" }", a IA ainda substituiu o 'with' por 'assert'
```json
prompt: ...
```
2 - ajuste nessa tipagem "const inputs = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[name="options"]:checked, select[name="options"]'),);"
```json
prompt: ...
```
3 - Ajuda na substituição do @import (deprecated) no SCSS para o @use
```json
prompt: ...
```
4 - Ajuda npara criar uma estrutura JSON como um mini CMS
```json
prompt: ...
```

## Processo Criativo
1 - Definição da estrutura geral aproximada 
2 - Estruturação dos componentes mais complexos
2 - Pesquisa de padrões de mercado
3 - Contruindo UI/UX inicial
4 - Finalização dos componentes
5 - Ajustes design
6 - Ajustes componentes

## Escolha do Layout
1 - Lembra o PowerPoint
2 - Tem elementos padrão do mercado
3 - Todos os links estão visiveis e o usuário tem feedback de todas as estapas e links da página
4 - Permite um minimo de acessibilidade, como expandir a tela de conteúdo 

## Escolhas na arquitetura
- Uso mínimo de bibliotecas (usei apenas bibioteca de ícones e o lazy load para imagens)
- Preferência em criação de hooks e de uso de componentes nativos (detecção de dispositivos, tratamento de requisição)
- Flexibilidade de uso dos componentes (fácil intercambialidade)
- Imagens otimizadas com LazyLoad e com tamanhos dieferetens para cada dispositivo
- Criação de uma estrutura JSON, simulando um CMS

## O que poder ser feito
- Acessibilidade (inversão de cores para daltonismo, aumento tamanho de fonte, ...)
- Aria