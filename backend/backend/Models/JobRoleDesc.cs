namespace backend.Models
{
    public class JobRoleDesc
    {
        public int Id { get; set; }
        public string DescTitle { get; set; }
        public string Description { get; set; }
        public int RolesId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual JobRole JobRole { get; set; }
    }
}
