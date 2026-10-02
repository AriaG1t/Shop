import Container from "../Container/Container";

function Footer() {
    return(
        <div className="bg-gray-500 text-gray-200 py-5 md:px-0 text-justify">
            <Container>
                <div className="flex justify-center items-center">
                    <h2 className="text-lg">Logo: Shop</h2>
                    <p className="mx-5 md:ml-20">+123456789</p>
                        <p>+987654321</p>
                </div>
                <p className="my-6 mx-auto font-thin md:w-3/4">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nobis temporibus adipisci. Fuga aspernatur autem ullam sequi, officiis nisi deserunt hic vitae repellat, sit doloribus repellendus vero! Fugit, atque facere?
                    Fuga saepe error sint, dolores cumque minus nobis animi dolorem vitae repellendus non porro veritatis laboriosam fugit numquam itaque totam repudiandae tempora natus soluta libero ullam, praesentium atque dolorum! Praesentium.
                    Qui amet eos magnam quam neque 
                </p>
                <div className="flex justify-center">
                    <p>Instagram</p>
                    <p className="mx-8">Telegram</p>
                    <p>WhatsApp</p>
                </div>
            </Container>
        </div>
    )
}

export default Footer;