class ClassMembersController < ApplicationController
  before_action :set_class_member, only: [:show, :edit, :update, :destroy]

  # GET /class_members
  # GET /class_members.json
  def index
    @class_members = ClassMember.order(:last_name).all
  end

  # GET /class_members/1
  # GET /class_members/1.json
  def show
  end

  # GET /class_members/new
  def new
    @class_member = ClassMember.new
  end

  # GET /class_members/1/edit
  def edit
  end

  # POST /class_members
  # POST /class_members.json
  def create
    @class_member = ClassMember.new(class_member_params)

    respond_to do |format|
      if @class_member.save
        format.html { redirect_to @class_member, notice: 'Class member was successfully created.' }
        format.json { render :show, status: :created, location: @class_member }
      else
        format.html { render :new }
        format.json { render json: @class_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /class_members/1
  # PATCH/PUT /class_members/1.json
  def update
    respond_to do |format|
      if @class_member.update(class_member_params)
        format.html { redirect_to @class_member, notice: 'Class member was successfully updated.' }
        format.json { render :show, status: :ok, location: @class_member }
      else
        format.html { render :edit }
        format.json { render json: @class_member.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /class_members/1
  # DELETE /class_members/1.json
  def destroy
    @class_member.destroy
    respond_to do |format|
      format.html { redirect_to class_members_url, notice: 'Class member was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_class_member
    @class_member = ClassMember.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def class_member_params
    params.require(:class_member).permit(:first_name, :last_name)
  end
end
