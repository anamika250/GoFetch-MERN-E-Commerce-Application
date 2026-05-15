import { Link } from "react-router-dom";
import useFetchCategories from "../hooks/useFetchCategories";

function Categories() {

  const { allcat, loading } =
    useFetchCategories();

  return (
    <>

      {/* HERO */}

      <section className="category-hero">

        <div className="category-hero-overlay">

          <span className="category-badge">
            Explore Categories
          </span>

          <h1>
            Fresh grocery
            <br />
            categories for you
          </h1>

          <p>
            Browse fruits, vegetables,
            dairy products, snacks and
            daily essentials.
          </p>

        </div>
      </section>


      {/* CATEGORIES */}

      <section className="categories-section">

        <div className="container">

          {
            loading ? (

              <div className="empty-state">

                <h2>
                  Loading categories...
                </h2>

              </div>

            ) : allcat.length > 0 ? (

              <>

                <div className="section-title">

                  <h2>
                    Shop By Categories
                  </h2>

                  <p>
                    Find products easily by category
                  </p>

                </div>


                <div className="categories-grid">

                  {
                    allcat.map((data) => (

                      <Link
                        to={`/subcategories?cid=${data._id}`}
                        className="category-card"
                        key={data._id}
                      >

                        {/* IMAGE */}

                        <div className="category-image">

                          <img
                            src={`${process.env.REACT_APP_APIURL}/uploads/${
                              data.picname || "defaultpic.jpg"
                            }`}
                            alt={data.catname}
                          />

                        </div>


                        {/* CONTENT */}

                        <div className="category-content">

                          <h3>
                            {data.catname}
                          </h3>

                          <span>
                            Explore Products →
                          </span>

                        </div>

                      </Link>
                    ))
                  }

                </div>

              </>

            ) : (

              <div className="empty-state">

                <h2>
                  No categories found
                </h2>

              </div>

            )
          }

        </div>

      </section>

    </>
  );
}

export default Categories;