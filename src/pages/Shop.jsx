const PRODUCTS = [
  { name: "BRWNN Move Hoodie", price: "£38", image: "/images/shop-hoodie.jpg" },
  { name: "Sisterhood Tote Bag", price: "£14", image: "/images/shop-tote.jpg" },
  { name: "Wellness Journal", price: "£18", image: "/images/shop-journal.jpg" },
];

export default function Shop() {
  return (
    <>
      <section className="pt-16 pb-14 sm:pt-24 sm:pb-20 px-5 text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Shop
        </p>
        <h1 className="mt-2 font-heading font-extrabold text-4xl sm:text-6xl text-brwnn-purple-dark">
          Wear the movement.
        </h1>
        <p className="mt-4 text-ink-soft">Merch drop coming soon — join the WhatsApp community for launch alerts.</p>
      </section>

      <section className="pb-24 px-5">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="rounded-2xl overflow-hidden bg-brwnn-sand">
              <div
                className="h-48 bg-cover bg-center bg-brwnn-purple/10"
                style={{ backgroundImage: `url(${p.image})` }}
              />
              <div className="p-4">
                <h2 className="font-heading font-bold text-brwnn-purple-dark">{p.name}</h2>
                <p className="mt-1 text-ink-soft">{p.price}</p>
                <button
                  disabled
                  className="mt-3 w-full rounded-full bg-brwnn-purple-dark/40 text-white font-bold text-sm px-4 py-2 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
