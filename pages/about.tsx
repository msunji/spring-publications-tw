export default function Page() {
  return (
    <>
      <section className="text-content section-divider">
        <div className="container mx-auto">
          <h1>清泉出版社簡介</h1>
          <p>
            清泉自1997年，開始發行聖施禮華著作的中文版，至今已超過25年了，幾乎所有他的著作都已被翻譯為中文，另外還有些其他作者的作品。清泉也出版一些兒童書籍。中文版的發行，深得華人世界讀者的喜愛。
          </p>
          <h2>—Spring「泉水」</h2>
          <p>
          自地而生、無窮盡的水源，漸漸匯集成大河。這象徵著中國的俗語「清泉淹沒濁水」，也與聖施禮華經常建議的「美善淹沒邪惡」不謀而合。
          </p>
          <h2>—Spring「春天」</h2>
          <p>
            在那季節樹木開始發芽帶給人希望。
          </p>
          <h2>—Spring「彈簧」</h2>
          <p>
          聖施禮華曾說過，當我們受到考驗時，我們被重壓著就像被擠壓的彈簧，但是如果我們堅持不懈，天主會幫助我們渡過難關，我們會高高地騰躍反彈，比原來跳得更高。
          </p>
        </div>
      </section>
      <section>
        <div className="container mx-auto">
          <h1>常見問題</h1>
          <div className="faq-accordion">
            <div className="collapse collapse-arrow border border-base-300 bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                Payment Method
              </div>
              <div className="collapse-content"> 
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                Delivery
              </div>
              <div className="collapse-content"> 
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
            <div className="collapse collapse-arrow border border-base-300 bg-base-200">
              <input type="checkbox" /> 
              <div className="collapse-title text-xl font-medium">
                Ordering Books
              </div>
              <div className="collapse-content"> 
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}