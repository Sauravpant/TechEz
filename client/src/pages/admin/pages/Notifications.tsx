const notificationData = [
  { id: 1, name: "User 123 joined TechEz" },
  { id: 2, name: "Samir Shrestha signed up" },
  { id: 3, name: "Complaint raised by User Snets" },
  { id: 4, name: "Business ABC registered" },
  { id: 5, name: "Technician John Doe approved" },
];

const Notifications: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-md mt-4 ml-4 px-6 py-4 w-100%">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Notifications</h2>
      <div className="flex flex-col gap-4">
        {notificationData.map((notif) => (
          <div
            key={notif.id}
            className="flex items-center justify-between bg-muted/40 rounded-md px-4 py-3 shadow-sm hover:bg-muted/60 transition-colors"
          >
            <span className="text-foreground text-base font-medium">{notif.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
