namespace backend.Models
{
    public class Qualification
    {
        public Qualification() { 
            EducationalQualifications = new HashSet<EducationalQualification>();
        }
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<EducationalQualification> EducationalQualifications { get; set; }
    }
}
