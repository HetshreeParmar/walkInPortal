namespace backend.Models
{
    public class Stream
    {
        public Stream() { 
            EducationalQualifications = new HashSet<EducationalQualification>();
        }
        public int StreamId { get; set; }
        public string StreamName { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<EducationalQualification> EducationalQualifications { get; set; }
    }
}
