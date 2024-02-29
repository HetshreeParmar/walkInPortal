namespace backend.Models
{
    public class JobRole
    {
        public JobRole() { 
            JobRoleDescs = new HashSet<JobRoleDesc>();
        }
        public int Id { get; set; }
        public decimal? Package { get; set; }
        public int JobId { get; set; }
        public int RoleId { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual Job Job { get; set; }
        public virtual Role Role { get; set; }
        public virtual ICollection<JobRoleDesc> JobRoleDescs { get; set; }
    }
}
