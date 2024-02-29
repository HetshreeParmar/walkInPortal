namespace backend.Models
{
    public class EducationalQualification
    {
        public int EducationalQualificationId { get; set; }
        public decimal? Percentage { get; set; }
        public int PassingYear { get; set; }
        public int QualificationId { get; set; }
        public int StreamId { get; set; }
        public int CollegeId { get; set; }
        public int UserId { get; set; }
        public string OtherCollege { get; set; }
        public string OtherCollegeLocation { get; set; }

        public DateTime? DtCreated { get; set; }
        public DateTime? DtModified { get; set; }

        public virtual College College { get; set; }
        public virtual Stream Stream { get; set; }
        public virtual Qualification Qualification { get; set; }
        public virtual User User { get; set; }
    }
}
