import Link from "next/link";
import footerClassNames from "./footerClassNames";

const Footer = () => {
    const {
        container,
        footer,
        section,
        section1,
        section1Content,
        section1Heading,
        section2,
        sectionLink,
        section2Content,
        section2Heading,
        section2ul,
        section3,
        section3Content,
        section3Heading,
      } = footerClassNames;
  return (
    <footer className={footer} >
        <div className={container}>
            <div className={section}>
                <div className={section1}>
                    <h2 className={section1Heading}>LOGO</h2>
                    <p className={section1Content}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ad vero quis et officiis, ipsam dolorum aut aperiam magni laboriosam consectetur magnam, iste necessitatibus cumque? Laudantium nostrum eveniet ullam quasi. 
                    </p>
                </div>
                <div className={section2}>
                    <h2 className={section2Heading}>About Us</h2>
                    <ul className={section2ul}>
                        <li>
                            <Link href="#" className={sectionLink}>
                                Careers
                            </Link>

                        </li>
                        <li>
                            <Link href="#" className={sectionLink}>
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={section3}>
                    <h2 className={section3Heading}>
                        Contact Us
                    </h2>
                    <p className={section3Content}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius aliquid libero est deserunt modi unde. Distinctio dolorem dicta odit architecto magni. Vero voluptas quod provident asperiores. Tempora porro cumque quos.
                    </p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
