import { useResume } from '../../context/ResumeContext';
import { Eye, Download, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import { exportToPDF } from '../../services/pdfUtility';

import { useNotification } from '../../context/NotificationContext';

const PreviewPanel = () => {
  const { resumeData, changeTemplate } = useResume();
  const { templateId, personalDetails, education, experience, skills, projects } = resumeData;
  const { showToast } = useNotification();

  const handleDownload = async () => {
    showToast('Generating high-quality PDF...', 'loading', 0);
    try {
      const candidateName = personalDetails.fullName || 'resume';
      const cleanName = candidateName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      await exportToPDF('resume-preview-canvas', `${cleanName}_resume.pdf`);
      showToast('PDF exported successfully!', 'success');
    } catch (err) {
      showToast('Failed to export PDF resume. Please try again.', 'error');
    }
  };

  // Fallbacks for empty states
  const nameToDisplay = personalDetails.fullName || 'YOUR FULL NAME';
  const emailToDisplay = personalDetails.email || 'your.email@example.com';
  const phoneToDisplay = personalDetails.phone || '+1 (555) 000-0000';
  const addressToDisplay = personalDetails.address || 'City, State';
  const summaryToDisplay = personalDetails.summary || 'Write a brief professional summary about your background, expertise, and goals. Your text will render instantly inside the workspace layout.';

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-premium h-full flex flex-col gap-6">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            Live Preview
          </h3>
          <p className="text-xs text-slate-500">Select template style and download as PDF</p>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow-md shadow-blue-500/10 whitespace-nowrap ml-auto"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </button>
      </div>

      {/* Template selector switcher */}
      <div>
        <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider mb-2">
          Select Design Template
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'modern', label: 'Modern' },
            { id: 'ats', label: 'ATS-Friendly' },
            { id: 'minimal', label: 'Minimalist' },
            { id: 'professional', label: 'Professional' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => changeTemplate(t.id)}
              className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                templateId === t.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* A4 Paper Canvas Container */}
      <div className="flex-grow bg-slate-50 rounded-2xl p-4 sm:p-5 overflow-y-auto max-h-[620px] flex justify-center border border-slate-100">
        {/* Paper Canvas simulating A4 sheet */}
        <div
          id="resume-preview-canvas"
          className="bg-white w-full max-w-[550px] shadow-lg border border-slate-200 p-6 sm:p-8 rounded-sm min-h-[780px] flex flex-col justify-between"
        >
          <div className="space-y-5">
            {/* 1. MODERN TEMPLATE */}
            {templateId === 'modern' && (
              <div className="font-sans text-slate-800">
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-4 mb-5">
                  <h2 className="text-2xl font-extrabold text-slate-950 uppercase tracking-tight break-words">
                    {nameToDisplay}
                  </h2>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1">Professional Candidate</p>
                </div>

                <div className="grid grid-cols-12 gap-6">
                  {/* Left Sidebar Column */}
                  <div className="col-span-4 border-r border-slate-100 pr-4 space-y-4">
                    {/* Contacts */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                        Contact
                      </h4>
                      <ul className="space-y-1.5 text-[9px] text-slate-655 break-all">
                        <li className="flex items-center gap-1.5">
                          <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{emailToDisplay}</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{phoneToDisplay}</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{addressToDisplay}</span>
                        </li>
                        {personalDetails.website && (
                          <li className="flex items-center gap-1.5">
                            <Globe className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{personalDetails.website}</span>
                          </li>
                        )}
                        {personalDetails.linkedin && (
                          <li className="flex items-center gap-1.5">
                            <Linkedin className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{personalDetails.linkedin}</span>
                          </li>
                        )}
                        {personalDetails.github && (
                          <li className="flex items-center gap-1.5">
                            <Github className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{personalDetails.github}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-slate-905 uppercase tracking-wider border-b border-slate-100 pb-1">
                        Skills
                      </h4>
                      {(!skills?.technical?.length && !skills?.soft?.length && !skills?.languages?.length) ? (
                        <div className="space-y-1.5">
                          <div className="h-2 w-full bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-2 w-4/5 bg-slate-100 rounded animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-2.5">
                          {skills?.technical?.length > 0 && (
                            <div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-1">Technical</p>
                              <div className="flex flex-wrap gap-1">
                                {skills.technical.map((s, i) => (
                                  <span key={i} className="bg-violet-50 text-violet-700 border border-violet-100 px-1.5 py-0.5 rounded text-[8px] font-medium leading-none">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {skills?.soft?.length > 0 && (
                            <div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-1">Soft Skills</p>
                              <div className="flex flex-wrap gap-1">
                                {skills.soft.map((s, i) => (
                                  <span key={i} className="bg-sky-50 text-sky-700 border border-sky-100 px-1.5 py-0.5 rounded text-[8px] font-medium leading-none">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {skills?.languages?.length > 0 && (
                            <div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wide mb-1">Languages</p>
                              <div className="flex flex-wrap gap-1">
                                {skills.languages.map((s, i) => (
                                  <span key={i} className="bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.5 rounded text-[8px] font-medium leading-none">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Core Content Column */}
                  <div className="col-span-8 space-y-4">
                    {/* Summary */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">
                        Profile Summary
                      </h4>
                      <p className="text-[9px] text-slate-600 leading-relaxed text-justify break-words whitespace-pre-wrap">
                        {summaryToDisplay}
                      </p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">
                        Professional Experience
                      </h4>
                      {(!experience || experience.length === 0) ? (
                        <div className="space-y-2 py-1">
                          <div className="h-3 w-32 bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {experience.map((item, idx) => (
                            <div key={idx} className="text-[9px] break-words">
                              <div className="flex justify-between items-start font-bold text-slate-900">
                                <span>{item.company || 'Company Name'}</span>
                                <span className="font-semibold text-slate-400 text-[8px] shrink-0">
                                  {item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}
                                </span>
                              </div>
                              <div className="text-slate-500 font-semibold italic text-[8.5px]">
                                {item.position || 'Role/Position'}{item.location ? ` | ${item.location}` : ''}
                              </div>
                              {item.description && (
                                <p className="text-slate-600 mt-1 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">
                        Education
                      </h4>
                      {(!education || education.length === 0) ? (
                        <div className="space-y-2 py-1">
                          <div className="h-3 w-28 bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {education.map((item, idx) => (
                            <div key={idx} className="text-[9px] break-words">
                              <div className="flex justify-between items-start font-bold text-slate-900">
                                <span>{item.institution || 'School Name'}</span>
                                <span className="font-semibold text-slate-400 text-[8px] shrink-0">
                                  {item.startDate || 'Start'} - {item.current ? 'Present' : item.endDate || 'End'}
                                </span>
                              </div>
                              <div className="text-blue-600 font-semibold text-[8.5px]">
                                {item.degree || 'Degree'}{item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}
                              </div>
                              {item.description && (
                                <p className="text-slate-600 mt-1 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 pb-1 border-b border-slate-100">
                        Key Projects
                      </h4>
                      {(!projects || projects.length === 0) ? (
                        <div className="space-y-2 py-1">
                          <div className="h-3 w-32 bg-slate-100 rounded animate-pulse"></div>
                          <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {projects.map((item, idx) => (
                            <div key={idx} className="text-[9px] break-words">
                              <div className="flex justify-between items-start font-bold text-slate-900">
                                <span>{item.title || 'Project Title'}</span>
                                {item.link && (
                                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[8px] font-semibold">
                                    [Link]
                                  </a>
                                )}
                              </div>
                              {item.technologies && (
                                <div className="flex flex-wrap gap-1 mt-0.5 mb-1.5">
                                  {item.technologies.split(',').map((t, i) => (
                                    <span key={i} className="bg-slate-100 text-slate-600 px-1 py-0.2 rounded text-[7px] font-bold leading-none border border-slate-200">
                                      {t.trim()}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.description && (
                                <p className="text-slate-600 mt-0.5 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ATS FRIENDLY TEMPLATE */}
            {templateId === 'ats' && (
              <div className="font-mono text-slate-900 space-y-4">
                {/* Header */}
                <div className="text-center border-b border-slate-900 pb-3">
                  <h2 className="text-2xl font-bold uppercase tracking-tight">{nameToDisplay}</h2>
                  <div className="flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-[9px] mt-1 text-slate-700">
                    <span>{emailToDisplay}</span>
                    <span>•</span>
                    <span>{phoneToDisplay}</span>
                    <span>•</span>
                    <span>{addressToDisplay}</span>
                    {personalDetails.website && (
                      <>
                        <span>•</span>
                        <span>{personalDetails.website}</span>
                      </>
                    )}
                    {personalDetails.linkedin && (
                      <>
                        <span>•</span>
                        <span>{personalDetails.linkedin}</span>
                      </>
                    )}
                    {personalDetails.github && (
                      <>
                        <span>•</span>
                        <span>{personalDetails.github}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Profile Summary */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase border-b border-slate-900 pb-0.5 mb-1.5">
                    Professional Summary
                  </h3>
                  <p className="text-[9px] text-justify leading-relaxed whitespace-pre-wrap">{summaryToDisplay}</p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase border-b border-slate-900 pb-0.5 mb-2">
                    Work Experience
                  </h3>
                  {(!experience || experience.length === 0) ? (
                    <div className="space-y-1">
                      <div className="h-2.5 w-32 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {experience.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words">
                          <div className="flex justify-between font-bold">
                            <div>
                              <span>{item.company || 'Company Name'}</span>
                              <span className="font-normal"> — {item.position || 'Role/Position'}{item.location ? `, ${item.location}` : ''}</span>
                            </div>
                            <span className="font-semibold text-slate-655 text-[8.5px] shrink-0 text-right">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-slate-700 mt-1 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase border-b border-slate-900 pb-0.5 mb-2">
                    Education
                  </h3>
                  {(!education || education.length === 0) ? (
                    <div className="space-y-1">
                      <div className="h-2.5 w-28 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {education.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words">
                          <div className="flex justify-between font-bold">
                            <div>
                              <span>{item.institution || 'School Name'}</span>
                              <span className="font-normal"> — {item.degree || 'Degree'}{item.fieldOfStudy ? `, ${item.fieldOfStudy}` : ''}</span>
                            </div>
                            <span className="font-semibold text-slate-655 text-[8.5px] shrink-0 text-right">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-slate-700 mt-1 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase border-b border-slate-900 pb-0.5 mb-2">
                    Key Projects
                  </h3>
                  {(!projects || projects.length === 0) ? (
                    <div className="space-y-1">
                      <div className="h-2.5 w-32 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words">
                          <div className="flex justify-between font-bold">
                            <div>
                              <span>{item.title || 'Project Title'}</span>
                              {item.technologies && <span className="font-normal text-slate-655"> ({item.technologies})</span>}
                            </div>
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-655 hover:underline text-[8px] font-semibold">
                                {item.link}
                              </a>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-slate-750 mt-1 leading-relaxed whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase border-b border-slate-900 pb-0.5 mb-1.5">
                    Skills & Languages
                  </h3>
                  {(!skills?.technical?.length && !skills?.soft?.length && !skills?.languages?.length) ? (
                    <div className="h-2 w-full bg-slate-100 rounded animate-pulse"></div>
                  ) : (
                    <div className="space-y-1 text-[9px] text-slate-800">
                      {skills?.technical?.length > 0 && (
                        <div>
                          <span className="font-bold">Technical Skills: </span>
                          <span>{skills.technical.join(', ')}</span>
                        </div>
                      )}
                      {skills?.soft?.length > 0 && (
                        <div>
                          <span className="font-bold">Soft Skills: </span>
                          <span>{skills.soft.join(', ')}</span>
                        </div>
                      )}
                      {skills?.languages?.length > 0 && (
                        <div>
                          <span className="font-bold">Languages: </span>
                          <span>{skills.languages.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. MINIMALIST TEMPLATE */}
            {templateId === 'minimal' && (
              <div className="font-serif text-slate-900 space-y-4">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-light tracking-wide text-slate-950 uppercase">{nameToDisplay}</h2>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[8.5px] mt-1.5 text-slate-500 italic">
                    <span>{emailToDisplay}</span>
                    <span>|</span>
                    <span>{phoneToDisplay}</span>
                    <span>|</span>
                    <span>{addressToDisplay}</span>
                    {personalDetails.website && (
                      <>
                        <span>|</span>
                        <span>{personalDetails.website}</span>
                      </>
                    )}
                    {personalDetails.linkedin && (
                      <>
                        <span>|</span>
                        <span>{personalDetails.linkedin}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="py-1">
                  <p className="text-[9.5px] leading-relaxed text-justify text-slate-700 whitespace-pre-wrap">{summaryToDisplay}</p>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <h3 className="text-[9px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-0.5">
                    Experience
                  </h3>
                  {(!experience || experience.length === 0) ? (
                    <div className="h-4 bg-slate-50 w-3/4 rounded animate-pulse"></div>
                  ) : (
                    <div className="space-y-3">
                      {experience.map((item, idx) => (
                        <div key={idx} className="text-[9px] text-slate-700">
                          <div className="flex justify-between font-semibold text-slate-900">
                            <span>{item.company || 'Company Name'}</span>
                            <span className="font-normal italic text-[8.5px] text-slate-500">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          <div className="italic text-[8px] text-slate-500">
                            {item.position || 'Role/Position'}{item.location ? ` — ${item.location}` : ''}
                          </div>
                          {item.description && (
                            <p className="mt-1 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <h3 className="text-[9px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-0.5">
                    Education
                  </h3>
                  {(!education || education.length === 0) ? (
                    <div className="h-4 bg-slate-50 w-2/3 rounded animate-pulse"></div>
                  ) : (
                    <div className="space-y-3">
                      {education.map((item, idx) => (
                        <div key={idx} className="text-[9px] text-slate-700">
                          <div className="flex justify-between font-semibold text-slate-900">
                            <span>{item.institution || 'School Name'}</span>
                            <span className="font-normal italic text-[8.5px] text-slate-500">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          <div className="text-[8px] text-slate-500">
                            {item.degree || 'Degree'}{item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}
                          </div>
                          {item.description && (
                            <p className="mt-1 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div className="space-y-2">
                  <h3 className="text-[9px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-0.5">
                    Projects
                  </h3>
                  {(!projects || projects.length === 0) ? (
                    <div className="h-4 bg-slate-50 w-1/2 rounded animate-pulse"></div>
                  ) : (
                    <div className="space-y-3">
                      {projects.map((item, idx) => (
                        <div key={idx} className="text-[9px] text-slate-700">
                          <div className="flex justify-between font-semibold text-slate-900">
                            <span>{item.title || 'Project Title'}</span>
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:underline text-[7.5px]">
                                [Link]
                              </a>
                            )}
                          </div>
                          {item.technologies && (
                            <p className="text-[8px] italic text-slate-500 mt-0.5">Stack: {item.technologies}</p>
                          )}
                          {item.description && (
                            <p className="mt-1 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <h3 className="text-[9px] font-bold text-slate-950 uppercase tracking-widest border-b border-slate-100 pb-0.5">
                    Skills
                  </h3>
                  {(!skills?.technical?.length && !skills?.soft?.length && !skills?.languages?.length) ? (
                    <div className="h-3 bg-slate-50 w-full rounded animate-pulse"></div>
                  ) : (
                    <div className="text-[9px] text-slate-700 space-y-1">
                      {skills?.technical?.length > 0 && (
                        <p><strong>Technical:</strong> {skills.technical.join(', ')}</p>
                      )}
                      {skills?.soft?.length > 0 && (
                        <p><strong>Soft Skills:</strong> {skills.soft.join(', ')}</p>
                      )}
                      {skills?.languages?.length > 0 && (
                        <p><strong>Languages:</strong> {skills.languages.join(', ')}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. PROFESSIONAL TEMPLATE */}
            {templateId === 'professional' && (
              <div className="font-sans text-slate-900 space-y-4">
                {/* Accent Top Bar */}
                <div className="h-1.5 bg-slate-900 w-full rounded-t-sm"></div>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-950 tracking-tight">{nameToDisplay}</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Professional Candidate</p>
                  </div>
                  <div className="text-[9px] text-slate-655 space-y-0.5 sm:text-right shrink-0">
                    <p className="font-semibold">{emailToDisplay}</p>
                    <p>{phoneToDisplay}</p>
                    <p>{addressToDisplay}</p>
                    {(personalDetails.website || personalDetails.linkedin) && (
                      <p className="text-[8px] text-blue-600 font-medium">
                        {personalDetails.website && <span>{personalDetails.website} </span>}
                        {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
                      </p>
                    )}
                  </div>
                </div>

                {/* Profile Summary */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="bg-slate-900 h-3 w-1.5 rounded-sm"></span>
                    Professional Summary
                  </h3>
                  <p className="text-[9px] text-slate-700 leading-relaxed text-justify whitespace-pre-wrap">{summaryToDisplay}</p>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="bg-slate-900 h-3 w-1.5 rounded-sm"></span>
                    Employment History
                  </h3>
                  {(!experience || experience.length === 0) ? (
                    <div className="space-y-1.5 py-1">
                      <div className="h-2.5 w-40 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {experience.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words text-slate-700">
                          <div className="flex justify-between items-start font-bold text-slate-900">
                            <span>{item.company || 'Company Name'}</span>
                            <span className="font-bold text-slate-500 text-[8px] shrink-0">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          <div className="text-[8px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                            {item.position || 'Role/Position'}{item.location ? ` | ${item.location}` : ''}
                          </div>
                          {item.description && (
                            <p className="text-slate-655 mt-1.5 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="bg-slate-900 h-3 w-1.5 rounded-sm"></span>
                    Education & Credentials
                  </h3>
                  {(!education || education.length === 0) ? (
                    <div className="space-y-1.5 py-1">
                      <div className="h-2.5 w-36 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {education.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words text-slate-700">
                          <div className="flex justify-between items-start font-bold text-slate-900">
                            <span>{item.institution || 'School Name'}</span>
                            <span className="font-bold text-slate-500 text-[8px] shrink-0">
                              {item.startDate || 'Start'} – {item.current ? 'Present' : item.endDate || 'End'}
                            </span>
                          </div>
                          <div className="text-[8.5px] text-slate-500 italic mt-0.5">
                            {item.degree || 'Degree'}{item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}
                          </div>
                          {item.description && (
                            <p className="text-slate-655 mt-1.5 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Projects */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                    <span className="bg-slate-900 h-3 w-1.5 rounded-sm"></span>
                    Key Projects
                  </h3>
                  {(!projects || projects.length === 0) ? (
                    <div className="space-y-1.5 py-1">
                      <div className="h-2.5 w-32 bg-slate-100 rounded animate-pulse"></div>
                      <div className="h-2 w-full bg-slate-50 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {projects.map((item, idx) => (
                        <div key={idx} className="text-[9px] break-words text-slate-700">
                          <div className="flex justify-between items-start font-bold text-slate-900">
                            <span className="text-slate-900">{item.title || 'Project Title'}</span>
                            {item.link && (
                              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-[8px] font-semibold">
                                {item.link}
                              </a>
                            )}
                          </div>
                          {item.technologies && (
                            <p className="text-[8px] text-slate-500 italic mt-0.5">Technologies: {item.technologies}</p>
                          )}
                          {item.description && (
                            <p className="text-slate-655 mt-1.5 leading-relaxed text-justify whitespace-pre-wrap">{item.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="bg-slate-900 h-3 w-1.5 rounded-sm"></span>
                    Skills & Languages
                  </h3>
                  {(!skills?.technical?.length && !skills?.soft?.length && !skills?.languages?.length) ? (
                    <div className="h-2 w-full bg-slate-100 rounded animate-pulse mt-1.5"></div>
                  ) : (
                    <div className="space-y-1.5 text-[9px] text-slate-700 mt-1.5">
                      {skills?.technical?.length > 0 && (
                        <p><strong>Technical Competencies:</strong> {skills.technical.join(', ')}</p>
                      )}
                      {skills?.soft?.length > 0 && (
                        <p><strong>Interpersonal Qualities:</strong> {skills.soft.join(', ')}</p>
                      )}
                      {skills?.languages?.length > 0 && (
                        <p><strong>Languages Spoken:</strong> {skills.languages.join(', ')}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer branding details */}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
