# Next.js with Clean Architecture


專案為 e-commerce admin website, 處理大部分的電子商務後台管控，專案不架構同於以往前端專案，採納 clean architecture ，原因有下列幾點：
 <ol>
  <li>不同廠商之間的 e-commerce admin website 功能其實差不多，主要差異為畫面的呈現</li>
  <li>後台框架不一定採用 Next.js，可能為 Vue、Angular 等等，但功能可能幾乎一樣，需要將專案設計成不依賴框架的架構</li>
  <li>因為 JavaScript 的自由性，很常讓程式走向不一致，造成日後擴充、維護的困難，因此希望強加一種限制在專案上</li>
 </ol>

## Documentations

### Clean Architecture
  <ul>
    <li>
      <a href="https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/">
       A quick introduction to clean architecture
      </a>
    </li>
    <br />
    <li>
      <a href="https://github.com/falsy/react-with-clean-architecture">
        React with Clean architecture
      </a>
    </li>
  </ul>

## Notes

This is an amalgamation of the 2 existing examples:

- [React with Clean architecture](https://github.com/falsy/react-with-clean-architecture)
