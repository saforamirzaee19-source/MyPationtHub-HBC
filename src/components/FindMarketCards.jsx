const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: "36px",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    fontSize: "16px",
  },
  price: {
    fontSize: "22px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "16px 0 10px",
  },
  logo: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  name: {
    margin: 0,
    fontSize: "24px",
  },
  desc: {
    lineHeight: 1.6,
    margin: "0 0 20px",
  },
  btn: {
    marginTop: "auto",
    alignSelf: "flex-start",
    padding: "12px 24px",
    border: 0,
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    background: "linear-gradient(90deg, #ec008c, #8e1db8)",
    boxShadow: "0 6px 14px rgba(236, 0, 140, 0.3)",
  },
};

export default function MarketplaceCard({
  image,
  category,
  price,
  currency = "RM",
  logo,
  name,
  description,
  buttonText = "BUY NOW",
  onBuy,
}) {
  return (
    <div className="marketplace-card" style={styles.card}>
      <img style={styles.image} src={image} alt={name} />

      <div style={styles.body}>
        <div style={styles.top}>
          <span className="marketplace-card__category" style={styles.category}>{category}</span>
          <span className="marketplace-card__price" style={styles.price}>
            {price} {currency}
          </span>
        </div>

        <div style={styles.brand}>
          <img style={styles.logo} src={logo} alt="" />
          <h3 className="marketplace-card__name" style={styles.name}>{name}</h3>
        </div>

        <p className="marketplace-card__description" style={styles.desc}>{description}</p>

        <button className="marketplace-card__button" style={styles.btn} onClick={onBuy}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}