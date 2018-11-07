<?= $this->Html->css('userAdd') ?>
<div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
        <div class="jumbotron jumbotron-fluid rounded">
            <div class="container">
            <h1 class="display-4"><?php echo h($user->username)?></h1>
                <p class="lead"><?=__("Modify your data")?></p>
                <hr class="my-4">

                <?= $this->Flash->render('auth') ?>
                <?= $this->Form->create($user) ?>

                <div class="form-group">

                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    mail_outline
                                </i>
                            </div>
                        </div>
                        <?= $this->Form->control('email',["class"=>"form-control","placeholder"=>__("Email"),"label"=>false,"type"=>"email"]) ?>
                    </div>

                    <div class="input-group passwd">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    mail_outline
                                </i>
                            </div>
                        </div>
                        <?= $this->Form->control('username',["class"=>"form-control","placeholder"=>__("Username"),"label"=>false]) ?>
                    </div>

                    <div class="input-group passwd">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    person
                                </i>
                            </div>
                        </div>
                        <?= $this->Form->control('name',["class"=>"form-control","placeholder"=>__("Name"),"label"=>false]) ?>
                    </div>

                    <div class="input-group passwd">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    lock
                                </i>
                            </div>
                        </div>
                        <?= $this->Form->control('password',["class"=>"form-control","placeholder"=>__("Password"),"label"=>false,"value"=>""]) ?>
                    </div>

                    <div class="input-group passwd">
                        <div class="input-group-prepend">
                            <div class="input-group-text">
                                <i class="material-icons">
                                    refresh
                                </i>
                            </div>
                        </div>
                        <?= $this->Form->control('password_confirm',["class"=>"form-control","placeholder"=>__("Repeat password"),"label"=>false,"type"=>"password","value"=>""]) ?>
                    </div>
                </div>

                <div class="form-group row submit-button">
                    <div class="col-sm-12">
                    <?= $this->Form->button(__('Edit'), ['controller'=>'users','action' => 'edit',"class"=>"btn btn-outline-info"]) ?>
                    </div>
                </div>
                <?= $this->Form->end() ?>
            </div>
        </div>
    </div>
</div>