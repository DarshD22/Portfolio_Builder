import React, { useState } from 'react';

const SkillShowcase = ({ skills, onUpdate }) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryIndex, setEditingCategoryIndex] = useState(-1);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 0,
    certificationUrl: ''
  });

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    if (editingCategoryIndex >= 0) {
      const updatedSkills = [...skills];
      updatedSkills[editingCategoryIndex].category = newCategory;
      onUpdate(updatedSkills);
      setEditingCategoryIndex(-1);
    } else {
      onUpdate([...skills, { category: newCategory, items: [] }]);
    }
    setNewCategory('');
  };

  const handleDeleteCategory = (categoryIndex) => {
    const updatedSkills = skills.filter((_, index) => index !== categoryIndex);
    onUpdate(updatedSkills);
  };

  const handleEditCategory = (categoryIndex) => {
    setNewCategory(skills[categoryIndex].category);
    setEditingCategoryIndex(categoryIndex);
  };

  const handleAddSkill = (categoryIndex) => {
    if (!newSkill.name.trim()) return;

    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].items.push({
      name: newSkill.name,
      level: parseInt(newSkill.level) || 0,
      certificationUrl: newSkill.certificationUrl
    });
    onUpdate(updatedSkills);
    setNewSkill({ name: '', level: 0, certificationUrl: '' });
  };

  const handleDeleteSkill = (categoryIndex, skillIndex) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].items = updatedSkills[categoryIndex].items.filter(
      (_, index) => index !== skillIndex
    );
    onUpdate(updatedSkills);
  };

  const handleEditSkill = (categoryIndex, skillIndex, field, value) => {
    const updatedSkills = [...skills];
    updatedSkills[categoryIndex].items[skillIndex][field] = field === 'level' 
      ? parseInt(value) || 0 
      : value;
    onUpdate(updatedSkills);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Skills & Expertise</h2>

      {/* Add Category */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Add Skill Category"
            className="flex-1 p-2 border rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingCategoryIndex >= 0 ? 'Update' : 'Add'} Category
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {skills.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{category.category}</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditCategory(categoryIndex)}
                    className="px-3 py-1 text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(categoryIndex)}
                    className="px-3 py-1 text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Add Skill Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Skill Name"
                  className="p-2 border rounded"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Skill Level (0-100)"
                  className="p-2 border rounded"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Certification URL (optional)"
                  className="p-2 border rounded"
                  value={newSkill.certificationUrl}
                  onChange={(e) => setNewSkill({ ...newSkill, certificationUrl: e.target.value })}
                />
              </div>
              <button
                onClick={() => handleAddSkill(categoryIndex)}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Add Skill
              </button>

              {/* Skills List */}
              <div className="mt-4 space-y-3">
                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => handleEditSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="number"
                        value={skill.level}
                        onChange={(e) => handleEditSkill(categoryIndex, skillIndex, 'level', e.target.value)}
                        min="0"
                        max="100"
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={skill.certificationUrl}
                        onChange={(e) => handleEditSkill(categoryIndex, skillIndex, 'certificationUrl', e.target.value)}
                        placeholder="Certification URL"
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(categoryIndex, skillIndex)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillShowcase;