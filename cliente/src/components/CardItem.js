function CardItem({ title, subtitle, image }) {
  return (
    <div
      style={{
        backgroundColor: "#2a2a2a",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          width={60}
          height={60}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "15px",
          }}
        />
      )}
      <div style={{ color: "white" }}>
        <strong style={{ fontSize: "1.1rem" }}>{title}</strong>
        {subtitle && <p style={{ margin: 0, opacity: 0.8 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default CardItem;
