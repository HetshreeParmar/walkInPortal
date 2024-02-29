namespace backend.Models
{
    public class ApplicationRole
    {
        public int RoleId { get; set; }
        public int ApplicationId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual Application Application { get; set; }
        public virtual Role Role { get; set; }
    }
}
