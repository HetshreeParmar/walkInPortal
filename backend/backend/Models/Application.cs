namespace backend.Models
{
    public class Application
    {
        public Application() { 
            ApplicationRoles = new HashSet<ApplicationRole>();
        }
        public int ApplicationId { get; set; }
        public string Resume { get; set; }
        public int UserId { get; set; }
        public int JobId { get; set; }
        public int SlotId { get; set; }
        public string HallTicket { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual Job Job { get; set; }
        public virtual Slot Slot { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<ApplicationRole> ApplicationRoles { get; set; }
    }
}
