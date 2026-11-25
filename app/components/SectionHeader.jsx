export default function SectionHeader({ title, children, id }) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {children ? <div>{children}</div> : null}
    </div>
  );
}
