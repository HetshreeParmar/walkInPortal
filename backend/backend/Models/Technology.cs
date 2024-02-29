namespace backend.Models
{
    public class Technology
    {
        public Technology() {
            ProfessionalQualificationExpertTeches = new HashSet<ProfessionalQualificationExpertTech>();
            ProfessionalQualificationFamiliarTeches = new HashSet<ProfessionalQualificationFamiliarTech>();
        }
        public int TechnologyId { get; set; }
        public string TechName { get; set; }
        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual ICollection<ProfessionalQualificationExpertTech> ProfessionalQualificationExpertTeches { get; set; }
        public virtual ICollection<ProfessionalQualificationFamiliarTech> ProfessionalQualificationFamiliarTeches { get; set; }
    }
}
