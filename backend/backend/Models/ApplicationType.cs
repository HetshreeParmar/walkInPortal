namespace backend.Models
{
    public class ApplicationType
    {
        public ApplicationType() {
            ProfessionalQualifications = new HashSet<ProfessionalQualification>();
        }
        public int ApplicationTypeId { get; set; }
        public string ApplicationTypeName { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<ProfessionalQualification> ProfessionalQualifications { get; set; }
    }
}
