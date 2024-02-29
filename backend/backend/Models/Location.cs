namespace backend.Models
{
    public class Location
    {
        public Location() { 
            Colleges = new HashSet<College>();
            Jobs = new HashSet<Job>();
        }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<College> Colleges { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}
